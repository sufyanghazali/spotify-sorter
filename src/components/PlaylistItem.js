const PlaylistItem = ({ playlist, onPlaylistSelect, selectedPlaylist }) => {
  return (
    <div
      className={`text-sm py-1.5 hover:text-white ${
        selectedPlaylist && playlist.name === selectedPlaylist.name
          ? "text-white"
          : ""
      }`}
      onClick={() => onPlaylistSelect(playlist)}
    >
      {playlist.name}
    </div>
  );
};

export default PlaylistItem;
