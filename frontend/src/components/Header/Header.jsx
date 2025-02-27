import { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";

import "./header.css";

export default function Header({ name, loggedIn }) {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  function handelClick() {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }

  function clickLink() {
    setIsOpen(false);
  }

  useEffect(() => {
    function closeBurgerForResize() {
      if (document.documentElement.clientWidth > "767") {
        setIsOpen(false);
        window.removeEventListener("resize", closeBurgerForResize);
      }
    }
    if (isOpen) {
      window.addEventListener("resize", closeBurgerForResize);
      return () => window.removeEventListener("resize", closeBurgerForResize);
    }
  }, [isOpen]);
  const [params] = useSearchParams();

  return (
    <header
      className={`header page__header ${
        name !== "homepage" ? "page__header_type_page" : ""
      }`}
    >
      <div>
        <Link to={"/"} className="header__link-home"></Link>
      </div>
      {name === "homepage" && !loggedIn ? (
        <nav>
          <ul className="header__links-container">
            <li>
              <Link to={"/signup"} className="header__signup">
                Регистрация
              </Link>
            </li>
            <li>
              <Link to={"/signin"} className="header__signin">
                Войти
              </Link>
            </li>
          </ul>
        </nav>
      ) : (
        <>
          <nav className={`header__nav ${isOpen ? "header__nav_open" : ""}`}>
            <ul className="header__links-container header__links-container_type_page">
              <li className="header__link-container">
                <Link
                  to={"/"}
                  className={`header__link ${
                    pathname === "/" ? "header__link_active" : ""
                  }`}
                  onClick={clickLink}
                >
                  Главная
                </Link>
              </li>
              <li className="header__link-container">
                <Link
                  to={{
                    pathname: "/movies",
                    search:
                      pathname === "/movies"
                        ? `?${params.toString()}`
                        : undefined,
                  }}
                  className={`header__link ${
                    pathname === "/movies" ? "header__link_active" : ""
                  }`}
                  onClick={clickLink}
                >
                  Фильмы
                </Link>
              </li>
              <li className="header__link-container">
                <Link
                  to={"/saved-movies"}
                  className={`header__link ${
                    pathname === "/saved-movies" ? "header__link_active" : ""
                  }`}
                  onClick={clickLink}
                >
                  Сохранённые фильмы
                </Link>
              </li>
              <li className="header__link-container">
                <Link
                  to={"/profile"}
                  className={`header__link header__link_type_acc ${
                    pathname === "/profile" ? "header__link_active" : ""
                  }`}
                  onClick={clickLink}
                >
                  Аккаунт <div className="header__acc-icon"></div>
                </Link>
              </li>
            </ul>
            <button
              type="button"
              className="header__burger-close"
              onClick={handelClick}
            ></button>
          </nav>
          <button
            type="button"
            className="header__burger"
            onClick={handelClick}
          ></button>
        </>
      )}
    </header>
  );
}
