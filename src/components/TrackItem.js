const TrackItem = ({ track }) => {
  const artistNames = track.track.artists.map((artist) => artist.name);

  return (
    <div className="flex h-14 pl-4 text-neutral-300">
      <div className="mr-4 w-10">
        <img
          src={track.track.album.images[0].url}
          alt={track.track.album.name}
        ></img>
      </div>
      <div className="w-50">
        <div className="text-white">{track.track.name}</div>
        <div className="text-sm">{artistNames.join(", ")}</div>
      </div>
      {/* <div className="w-50">
        <div className="">{track
.track.album.name}</div>
      </div> */}
    </div>
  );
};

export default TrackItem;
