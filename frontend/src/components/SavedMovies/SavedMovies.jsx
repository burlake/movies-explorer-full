import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

import SearchForm from "../SearchForm/SearchForm";
import { filterMovies } from "../../hooks/movies";

export default function SavedMovies({ savedMovies, onDelete, setIsError }) {
  const [params] = useSearchParams();
  const filter = params.get("filter");
  const isShortsOnly = !!params.get("only-shorts");
  const filteredMovies = useMemo(() => {
    if (!filter && !isShortsOnly) return savedMovies;
    return filterMovies(savedMovies, filter, isShortsOnly);
  }, [savedMovies, filter, isShortsOnly]);
  const [firstEntrance, setFirstEntrance] = useState(true);

  useEffect(() => {
    if (savedMovies.length === 0) {
      setFirstEntrance(true);
    } else {
      setFirstEntrance(false);
    }
  }, [savedMovies]);

  return (
    <>
      <SearchForm setIsError={setIsError} savedMovie={savedMovies} />
      <MoviesCardList
        movies={filteredMovies}
        onDelete={onDelete}
        firstEntrance={firstEntrance}
      />
    </>
  );
}
