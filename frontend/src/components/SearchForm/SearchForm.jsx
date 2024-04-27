import "../App";
import "./SearchForm.css";

import { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import useFormValidation from "../../utils/useFormValidation";
import Filter from "../Filter/Filter";

function Search({ savedMovie, setIsError }) {
  const { pathname } = useLocation();
  const [param, setParams] = useSearchParams();
  const filter = param.get("filter");

  const { values, isValid, handleChange, reset } = useFormValidation();

  useEffect(() => {
    if (pathname === "/saved-movies" && savedMovie.length === 0) {
      reset({ search: "" });
    } else {
      reset({ search: filter });
    }
    setIsError(false);
  }, [setIsError, pathname, savedMovie, filter, reset]);

  function showError(event) {
    if (values.search === 0) {
      document
        .querySelector(".search-form__error-text")
        .classList.add("search-form__error-text_disabled");
    } else {
      document
        .querySelector(".search-form__error-text")
        .classList.remove("search-form__error-text_disabled");
    }
  }

  function onSubmit(event) {
    event.preventDefault();
    const searchValue = event.target.search.value;
    setParams(
      (params) => {
        if (searchValue) {
          params.set("filter", searchValue);
        } else {
          params.delete("filter");
        }
        return params;
      },
      { replace: true }
    );

    if (searchValue) {
      setIsError(false);
    } else {
      setIsError(true);
      showError();
    }
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
              min="1"
              max="10"
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
          <p className="search-form__error-text_disabled search-form__error-text">
            Нужно ввести ключевое слово
          </p>
        </div>
        <Filter name="only-shorts" />
      </section>
    </div>
  );
}

export default Search;
