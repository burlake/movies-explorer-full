import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../MoviesCardList/MoviesCardList";

export default function MoviesCard({ onDelete, addMovie, data, savedMovies }) {
  const { pathname } = useLocation();
  const [click, setClick] = useState(false);

  useEffect(() => {
    if (pathname === "/movies")
      setClick(savedMovies.some((element) => data.id === element.movieId));
  }, [savedMovies, data.id, setClick, pathname]);

  function onClick() {
    if (savedMovies.some((element) => data.id === element.movieId)) {
      setClick(true);
      addMovie(data);
    } else {
      setClick(false);
      addMovie(data);
    }
  }

  function convertTime(duration) {
    const minutes = duration % 60;
    const hours = Math.floor(duration / 60);
    return hours === 0
      ? `${minutes}м`
      : minutes === 0
      ? `${hours}ч`
      : `${hours}ч${minutes}м`;
  }

  return (
    <li className="card">
      <article>
        <div className="card__container">
          <p className="card__place">{data.nameRU}</p>
          <span className="card__place">{convertTime(data.duration)}</span>
        </div>
        <Link to={data.trailerLink} target="_blank">
          <img
            src={
              pathname === "/movies"
                ? `https://api.nomoreparties.co${data.image.url}`
                : data.image
            }
            alt={data.name}
            className="card__img"
          />
        </Link>
        {pathname === "/movies" ? (
          <button
            type="button"
            className={`card__like ${click ? "card__like_active" : ""}`}
            onClick={onClick}
          >
            Сохранить
          </button>
        ) : (
          <button
            type="button"
            className={`card__like card__like_active_delete`}
            onClick={() => onDelete(data._id)}
          ></button>
        )}
      </article>
    </li>
  );
}
