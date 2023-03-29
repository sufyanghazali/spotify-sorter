import Song from "./Song";

const Playlist = ({ songs }) => {
  const listItems = songs.map((song) => {
    return <Song song={song} key={song.track.id} />;
  });

  return <ul>{listItems}</ul>;
};

export default Playlist;
