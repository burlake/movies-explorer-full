export function filterMovies(movies, filter, isShortsOnly) {
  filter = filter ? filter.toLowerCase() : null;
  return movies.filter((movie) => {
    const nameFilter = filter
      ? movie.nameRU.toLowerCase().includes(filter)
      : true;
    const shortFilter = isShortsOnly ? movie.duration <= 40 : true;
    return nameFilter && shortFilter;
  });
}
