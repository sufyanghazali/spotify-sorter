import PlaylistItem from "./PlaylistItem";

const Playlists = ({ playlists, onPlaylistSelect, selectedPlaylist }) => {
  const list = playlists.map((playlist) => {
    return (
      <PlaylistItem
        playlist={playlist}
        onPlaylistSelect={onPlaylistSelect}
        selectedPlaylist={selectedPlaylist}
        key={playlist.id}
      />
    );
  });

  return <div>{list}</div>;
};

export default Playlists;
