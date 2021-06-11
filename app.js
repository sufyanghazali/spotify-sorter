const express = require("express");
const request = require("request");
const cors = require("cors");
const querystring = require("querystring");
const cookieParser = require("cookie-parser");

const client_id = "de6e5a1511474a2096d334d729b359fd";
const client_secret = "86b08537868f41179121f71ea0e19efc";
const redirect_uri = "http://localhost:3000/callback";

const generateRandomString = function (length) {
    let str = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
        str += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return str;
}

const stateKey = "spotify_auth_state";

const port = 3000;
const app = express();

app.use(cors())
    .use(cookieParser())
    .use(express.urlencoded({ extended: true })); // parse url-encoded bodies. for req.body


app.get("/", (req, res) => {
    res.send("Hello");
})

app.get('/login', (req, res) => {
    const state = generateRandomString(16);
    res.cookie(stateKey, state);

    const scope = "user-read-private user-read-email";
    res.redirect("https://accounts.spotify.com/authorize?" +
        querystring.stringify({
            response_type: "code",
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        }));
});

app.get("/callback", (req, res) => {
    const { code, state } = req.query || null;

    console.log(req.query);
    const storedState = req.cookies ? req.cookies[stateKey] : null;
    console.log(state);
    console.log(storedState);

    if (state === null || state !== storedState) {
        res.redirect("/#" + querystring.stringify({
            error: "state_mismatch"
        }));
    } else {
        res.clearCookie(stateKey);
        const authOptions = {
            url: "https://accounts.spotify.com/api/token",
            form: {
                code: code,
                redirect_uri: redirect_uri,
                grant_type: "authorization_code"
            },
            headers: {
                "Authorization": "Basic " + (Buffer.from(`${ client_id }:${ client_secret }`).toString("base64"))
            },
            json: true
        }

        request.post(authOptions, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                const { access_token, refresh_token } = body;

                const options = {
                    url: "https://api.spotify.com/v1/me",
                    headers: {
                        "Authorization": "Bearer " + access_token
                    },
                    json: true
                }

                request.get(options, (error, response, body) => {
                    console.log(body);
                });

                res.redirect("/#" +
                    querystring.stringify({
                        access_token: access_token,
                        refresh_token: refresh_token
                    }));
            } else {
                res.redirect("/#" + querystring.stringify({
                    error: 'invalid_token'
                }));
            }
        });
    }
});


app.listen(port, () => {
    console.log(`Server up. Listening on port ${ port }`);
})


function serialize(obj) {
    let str = [];
    for (param in obj) {
        if (obj.hasOwnProperty(param)) {
            str.push(`${ encodeURIComponent(param) }=${ encodeURIComponent(obj[param]) }`);
        }
    }
    return str.join("&")
}