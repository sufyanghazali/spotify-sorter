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

  return (
    <div className="w-64 sticky top-0 h-screen px-4 pt-12 text-neutral-300">
      {list}
    </div>
  );
};

export default Playlists;
