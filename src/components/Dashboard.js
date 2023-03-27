import { useEffect, useState } from "react";
import axios from "axios";

import Playlist from "./Playlist";
import Playlists from "./Playlists";

const Dashboard = ({ access_token }) => {
  const [playlists, setPlaylists] = useState([]);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

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

  console.log(playlists);

  return (
    <div className="dashboard">
      {playlists ? <Playlists playlists={playlists} /> : <div>Loading</div>}
      
    </div>
  );
};

export default Dashboard;
