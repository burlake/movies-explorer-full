import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import apiMovies from "../../utils/MoviesApi";

import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import { filterMovies } from "../../hooks/movies";

export default function Movies({ setIsError, addMovie, savedMovies }) {
  const [allMovies, setAllMovies] = useState(() => []);
  const [isLoading, setIsLoading] = useState(true);
  const [serverError, setServerError] = useState(false);
  const [firstEntrance, setFirstEntrance] = useState(true);
  const [params, setParams] = useSearchParams();
  const filter = params.get("filter");
  const isShortsOnlyParam = params.get("only-shorts");
  const isShortsOnly = !!isShortsOnlyParam;
  const filteredMovies = useMemo(
    () => (filter ? filterMovies(allMovies, filter, isShortsOnly) : []),
    [allMovies, filter, isShortsOnly]
  );

  const isMounted = useRef(false);
  useEffect(() => {
    if (isMounted.current) return;
    isMounted.current = true;

    if (!!filter || !!isShortsOnlyParam) return;

    const lastSearchItem = localStorage.getItem("last-search");
    if (!lastSearchItem) return;

    const lastSearch = JSON.parse(lastSearchItem);
    setParams(
      (params) => {
        if (lastSearch.filter) {
          params.set("filter", lastSearch.filter);
        } else {
          params.delete("filter");
        }
        if (lastSearch.isShortsOnly) {
          params.set("only-shorts", lastSearch.isShortsOnly);
        } else {
          params.delete("only-shorts", lastSearch.isShortsOnly);
        }
        return params;
      },
      { replace: true }
    );
  }, [setParams, filter, isShortsOnlyParam]);

  useEffect(() => {
    localStorage.setItem(
      "last-search",
      JSON.stringify({ filter, isShortsOnly })
    );
  }, [filter, isShortsOnly]);

  useEffect(() => {
    const movies = JSON.parse(localStorage.getItem("allmovies"));
    if (!movies) {
      apiMovies
        .getMovies()
        .then((res) => {
          setAllMovies(res);
          setFirstEntrance(false);
          localStorage.setItem("allmovies", JSON.stringify(res));
        })
        .catch((e) => {
          console.error(e);
          setServerError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
      return;
    }
    setAllMovies(movies);
    setIsLoading(false);
  }, []);

  return (
    <>
      <SearchForm setIsError={setIsError} />
      <MoviesCardList
        movies={filteredMovies}
        addMovie={addMovie}
        savedMovies={savedMovies}
        isLoading={isLoading}
        serverError={serverError}
        firstEntrance={firstEntrance}
      />
    </>
  );
}
