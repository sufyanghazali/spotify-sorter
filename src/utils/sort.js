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
