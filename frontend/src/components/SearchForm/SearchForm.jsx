import "./SearchForm.css";
import "../App";

import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

import useFormValidation from "../../utils/useFormValidation";
import Filter from "../Filter/Filter";

import ErrorContext from "../../contexts/ErrorContext";
import SendContext from "../../contexts/SendContext";



function Search({
  savedMovie,
  isCheck,
  changeShort,
  searchMovies,
  setIsError,
  searchedMovie
}) {
  const { pathname } = useLocation();
  const { values, isValid, handleChange, reset} = useFormValidation() ;
  const isError = useContext(ErrorContext);
  const isSend = useContext(SendContext);

  useEffect(() => {
    if ((pathname === '/saved-movies' && savedMovie.length === 0)) {
      reset({ search: '' })
    } else {
      reset({ search: searchedMovie })
    }
    setIsError(false)
  }, [searchedMovie, setIsError, pathname, savedMovie])

  function showError(event) {
    if (values.search === 0) {
      document.querySelector('.search-form__error-text').classList.add('search-form__error-text_disabled');
    } else {
      document.querySelector('.search-form__error-text').classList.remove('search-form__error-text_disabled');
    }
  }

  function onSubmit(event) {
    event.preventDefault();
    if (event.target.search.value) {
      searchMovies(event.target.search.value);
      setIsError(false);
    } else {
      setIsError(true);
      showError()

    }
    console.log("onSubmit",onSubmit);
  }



  return (
    <div className="page">
      <section className="search page__search">
        <div className="box search__container">
          <form
            className="container-4 search__form"
            noValidate
            name={"SearchForm"}
            onSubmit={onSubmit}
          >
            <input
              min="1" max="10"
              type="text"
              name="search"
              placeholder="Фильм"
              className="search__input"
              id="search"
              value={values.search || ""}
              onChange={(evt) => {
                handleChange(evt);
                setIsError(false);
              }}
              disabled={savedMovie ? savedMovie.length === 0 && true : false}

              required
            />

            <button
              className={`search__submit ${
                savedMovie
                  ? pathname === "/saved-movies" &&
                    savedMovie.length === 0 &&
                    "search__submit_disabled"
                  : ""
              }`}
              // disabled={!isValid || isSend || isError}
              type="submit"
            >
              Поиск
            </button>
          </form>
          <p className="search-form__error-text_disabled search-form__error-text">Нужно ввести ключевое слово</p>
        </div>
        <Filter isCheck={isCheck} changeShort={changeShort} />
      </section>
    </div>
  );
}

export default Search;
