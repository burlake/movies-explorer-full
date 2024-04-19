import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";
import { useEffect, useState } from "react";
import Preloader from "../Preloader/Preloader";

export default function MoviesCardList({
  movies,
  onDelete,
  addMovie,
  savedMovies,
  isLoading,
  serverError,
  firstEntrance,
  name,
}) {
  const { pathname } = useLocation();
  const [count, setCount] = useState("");
  const movie = movies.slice(0, count);

  function printCards() {
    const counter = { init: 12, step: 3 };
    if (window.innerWidth < 1280) {
      counter.init = 12;
      counter.step = 3;
    }
    if (window.innerWidth < 1024) {
      counter.init = 8;
      counter.step = 2;
    }
    if (window.innerWidth < 650) {
      counter.init = 5;
      counter.step = 1;
    }
    return counter;
  }

  useEffect(() => {
    if (pathname === "/movies") {
      setCount(printCards().init);
      function printCardsForResize() {
        if (window.innerWidth >= 4) {
          setCount(printCards().init);
        }
        if (window.innerWidth < 4) {
          setCount(printCards().init);
        }
        if (window.innerWidth < 1024) {
          setCount(printCards().init);
        }
        if (window.innerWidth < 650) {
          setCount(printCards().init);
        }
      }
      window.addEventListener("resize", printCardsForResize);
      return () => window.removeEventListener("resize", printCardsForResize);
    }
  }, [pathname, movies]);

  function clickMore() {
    setCount(count + printCards().step);
  }

  return (
    <section name={name}>
      <ul className="gallery">
        {isLoading ? (
          <Preloader />
        ) : pathname === "/movies" && movie.length !== 0 ? (
          movie.map((data) => {
            return (
              <MoviesCard
                key={data.id}
                savedMovies={savedMovies}
                addMovie={addMovie}
                data={data}
              />
            );
          })
        ) : movies.length !== 0 ? (
          movies.map((data) => {
            return (
              <MoviesCard key={data._id} onDelete={onDelete} data={data} />
            );
          })
        ) : serverError ? (
          <span className="gallery__serch-error">
            «Во время запроса произошла ошибка. Возможно, проблема с соединением
            или сервер недоступен. Подождите немного и попробуйте ещё раз»
          </span>
        ) : !firstEntrance ? (
          <span className="gallery__serch-error">«Ничего не найдено»</span>
        ) : pathname === "/movies" ? (
          <span className="gallery__serch-error">
            «Чтобы увидеть список фильмоа выполните поиск»
          </span>
        ) : (
          <span className="gallery__serch-error">
            «Нет сохранённых фильмов»
          </span>
        )}
      </ul>

      <div className="gallery__addition">
        {pathname === "/movies" && (
          <div className="gallery__addition">
            {movie.length < movies.length && (
              <button
                type="button"
                onClick={clickMore}
                className="gallery__addition_more"
              >
                Ёще
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
