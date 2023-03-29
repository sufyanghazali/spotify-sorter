const Song = ({ song }) => {
  console.log(song);

  const artistNames = song.track.artists.map((artist) => artist.name);

  return (
    <div className="flex h-14 pl-4 text-neutral-300">
      <div className="mr-4 w-10">
        <img
          src={song.track.album.images[0].url}
          alt={song.track.album.name}
        ></img>
      </div>
      <div className="w-50">
        <div className="text-white">{song.track.name}</div>
        <div className="text-sm">{artistNames.join(", ")}</div>
      </div>
      {/* <div className="w-50">
        <div className="">{song.track.album.name}</div>
      </div> */}
    </div>
  );
};

export default Song;
