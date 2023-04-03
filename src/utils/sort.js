const compare = (a, b) => {
  let dateA, dateB;
  let result = 0;
  dateA = Date.parse(a[0].track.album.release_date);
  dateB = Date.parse(b[0].track.album.release_date);

  if (dateA < dateB) result = -1;
  else if (dateB > dateA) result = 1;

  return result;
};

function groupTracksByAlbum(tracks) {
  return tracks.reduce((albums, track) => {
    const albumId = track.track.album.id;
    albums[albumId] = [...(albums[albumId] || []), track];
    return albums;
  }, {});
}

// Sort album tracks by their track number
function sortAlbumTracks(albums) {
  for (const albumId in albums) {
    albums[albumId].sort((a, b) => {
      return a.track.track_number - b.track.track_number;
    });
  }

  return albums;
}

function sortAlbumsByReleaseDate(albums) {
  const arr = Object.entries(albums);
  const albumArr = arr.map((album) => album[1]);
  albumArr.sort(compare).reverse();
  return albumArr;
}

export function sortTracksByReleaseDate(tracks) {
  const albums = groupTracksByAlbum(tracks);
  const sortedAlbums = sortAlbumTracks(albums);
  const sortedTracks = sortAlbumsByReleaseDate(sortedAlbums);
  console.log(sortedTracks);
  const flattened = sortedTracks.flat();
  console.log(flattened);
  return flattened;
}
