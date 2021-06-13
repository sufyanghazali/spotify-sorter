const express = require("express");
const axios = require("axios");
const path = require("path");
const cors = require("cors");
const querystring = require("querystring");
const cookieParser = require("cookie-parser");
const engine = require("ejs-mate");

const client_id = "de6e5a1511474a2096d334d729b359fd";
const client_secret = "86b08537868f41179121f71ea0e19efc";
const redirect_uri = "http://localhost:3000/callback";

const stateKey = "spotify_auth_state";
const port = 3000;
const app = express();

app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // set views directory for templates

app.use(cors())
    .use(cookieParser())
    .use(express.urlencoded({ extended: true })); // parse url-encoded bodies. for req.body

app.get("/", async (req, res) => {
    // TODO: logged in conditional

    const { access_token } = req.cookies;
    const id = '639SNqLUL7f425tG6KF5M3';
    const playlists = await getUserPlaylists(access_token);


    const playlist = await getPlaylist(id, access_token);

    console.log(playlist);
    res.render("home");
});



app.get('/login', (req, res) => {
    const state = generateRandomString(16);
    res.cookie(stateKey, state);

    const scope = "playlist-modify-public playlist-modify-private playlist-read-private playlist-read-collaborative";
    res.redirect("https://accounts.spotify.com/authorize?" +
        querystring.stringify({
            response_type: "code",
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        }));
});

app.get("/callback", async (req, res) => {
    const { code, state } = req.query || null;
    const storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
        res.redirect("/#" + querystring.stringify({
            error: "state_mismatch"
        }));
    } else {
        res.clearCookie(stateKey);

        const response = await axios({
            url: "https://accounts.spotify.com/api/token",
            method: "post",
            params: {
                code: code,
                redirect_uri: redirect_uri,
                grant_type: "authorization_code"
            },
            headers: {
                "Authorization": "Basic " + (Buffer.from(`${ client_id }:${ client_secret }`).toString("base64"))
            }
        }).then(response => response.data);

        const { access_token, refresh_token } = response;
        res.cookie("access_token", access_token, {
            maxAge: 3600
        });
        res.cookie("refresh_token", refresh_token);
        res.redirect("/");
    }
});


app.listen(port, () => {
    console.log(`Server up. Listening on port ${ port }`);
});


const serialize = function(obj) {
    let str = [];
    for (param in obj) {
        if (obj.hasOwnProperty(param)) {
            str.push(`${ encodeURIComponent(param) }=${ encodeURIComponent(obj[param]) }`);
        }
    }
    return str.join("&")
}

const generateRandomString = function(length) {
    let str = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
        str += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return str;
}

const getUserPlaylists = async function(token) {
    try {
        const data = await axios.get("https://api.spotify.com/v1/me/playlists", {
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then(response => response.data);

        return data;
    } catch (err) {
        console.error(err);
    }
}

const getPlaylistTracks = async function(id, token) {
    try {
        const data = await axios.get(`https://api.spotify.com/v1/playlists/${ id }/tracks`, {
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then(response => response.data);

        return data;
    } catch (err) {
        console.error(err);
    }
}