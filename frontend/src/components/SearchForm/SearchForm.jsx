import "./SearchForm.css";
import "../App";

import { useLocation } from "react-router-dom";

import useFormValidation from "../../utils/useFormValidation";

function Search({
  savedMovie,
  isCheck,
  changeShort,
  searchMovies,
  setIsError
}) {
  const { pathname } = useLocation();
  const { values, handleChange, reset } = useFormValidation() ;

  function onSubmit(event) {
    event.preventDefault();
    if (event.target.search.value) {
      searchMovies(event.target.search.value);
      setIsError(false);
    } else {
      setIsError(true);
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
              type="search"
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
              type="submit"
            >
              Поиск
            </button>
          </form>
        </div>
        <div className="search__check">
          <div className="search__check-container">
            {" "}
            {/*toggle switch -  isCheck={isCheck} */}
            <input type="checkbox" id="switch" onChange={changeShort} />
            <label
              htmlFor="switch"
              className={`search__check-svg-circle ${
                !isCheck ? "search__check-svg-circle_active" : ""
              }`}
            >
              Toggle
            </label>
          </div>
          <span className="search__check-text">Короткометражки</span>
        </div>
      </section>
    </div>
  );
}

export default Search;
