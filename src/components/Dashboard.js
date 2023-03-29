import { useEffect, useState } from "react";
import axios from "axios";
import { compare } from "../utils/sort";

import Playlist from "./Playlist";
import Playlists from "./Playlists";
import PlaylistInfo from "./PlaylistInfo";

const Dashboard = ({ access_token }) => {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [isSorted, setIsSorted] = useState(false);

  useEffect(() => {
    async function getUserPlaylists() {
      const response = await axios
        .get("https://api.spotify.com/v1/me/playlists", {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then((res) => res.data.items);
      setPlaylists(response);
    }

    getUserPlaylists();
  }, [access_token]);

  const onPlaylistSelect = async (playlist) => {
    let config = {
      method: "get",
      url: playlist.tracks.href,
      params: {
        limit: 50,
      },
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };

    const response = await axios(config);
    let tracks = response.data.items;

    // Keep requesting for tracks from playlist until all of them are retrieved
    while (tracks.length < response.data.total) {
      // Edit config to offset subsequent requests
      config.params = {
        offset: tracks.length,
      };
      let next = await axios(config).then((response) => response.data.items);
      tracks = [...tracks, ...next];
    }

    console.log(tracks);
    setSelectedPlaylist(playlist);
    setTracks(tracks);
    setIsSorted(false);
  };

  const onSortButtonClicked = () => {
    const currentTracks = tracks.sort(compare).reverse();

    console.log(tracks);

    setTracks(currentTracks);
    setIsSorted(true);
  };

  const onSaveButtonClicked = async () => {
    if (isSorted) {
      const uris = tracks.map((track) => track.track.uri);

      let config = {
        url: `https://api.spotify.com/v1/playlists/${selectedPlaylist.id}/tracks`,
        method: "put",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        data: {
          uris: uris.slice(0, 100),
        },
      };

      await axios(config)
        .then(async () => {
          config.method = "post";

          if (uris.length > 100) {
            let counter = 100;

            while (counter < uris.length) {
              config.data = {
                uris: uris.slice(counter, counter + 100),
              };

              axios(config);
              counter += 100;
            }
          }
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
          console.log(error.config);
        });

      setIsSorted(false);
    }
  };

  return (
    <>
      <Playlists
        playlists={playlists}
        onPlaylistSelect={onPlaylistSelect}
        selectedPlaylist={selectedPlaylist}
      />
      <div className="w-full bg-neutral-900">
        <PlaylistInfo
          playlist={selectedPlaylist}
          onSortButtonClicked={onSortButtonClicked}
          onSaveButtonClicked={onSaveButtonClicked}
          isSorted={!isSorted}
        />
        <Playlist tracks={tracks} />
      </div>
    </>
  );
};

export default Dashboard;
