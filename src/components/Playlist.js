import TrackItem from "./TrackItem";

const Playlist = ({ tracks }) => {
  const listItems = tracks.map((track) => {
    return <TrackItem track={track} key={track.track.id} />;
  });

  return (
    <div className="p-8">
      <ul>{listItems}</ul>;
    </div>
  );
};

export default Playlist;
