const compare = (a, b) => {
  let dateA, dateB;
  let result = 0;
  dateA = Date.parse(a.track.album.release_date);
  dateB = Date.parse(b.track.album.release_date);

  if (dateA < dateB) result = -1;
  else if (dateB > dateA) result = 1;

  return result;
};

module.exports = {
  compare,
};


function sortTracksByReleaseDate(tracks) {
  // First, group the tracks by album
  const albums = {};
  tracks.forEach((track) => {
    if (!albums[track.album.id]) {
      albums[track.album.id] = {
        album: track.album,
        tracks: [],
      };
    }
    albums[track.album.id].tracks.push(track);
  });

  // Then, sort the tracks within each album by release date
  Object.values(albums).forEach((album) => {
    album.tracks.sort(
      (a, b) => new Date(a.album.release_date) - new Date(b.album.release_date)
    );
  });

  // Finally, return the sorted tracks in the original order of the albums
  return Object.values(albums)
    .map((album) => album.tracks)
    .flat();
}
