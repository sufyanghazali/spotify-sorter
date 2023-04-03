import TrackItem from "./TrackItem";

const Playlist = ({ tracks }) => {
  const listItems = tracks.map((track, index) => {
    return <TrackItem track={track} key={track.track.id} index={index} />;
  });

  return (
    <div className="p-8">
      <ul>{listItems}</ul>;
    </div>
  );
};

export default Playlist;
