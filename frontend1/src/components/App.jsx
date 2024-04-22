import { useState, useCallback, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";

import "./App.css";

import apiMain from "../utils/MainApi";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import Preloader from "./Preloader/Preloader";
import CurrentUserContext from "../contexts/CurrentUserContext";
import SendContext from "../contexts/SendContext";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import ProtectedRouteData from "./ProtectedRouteData/ProtectedRouteData";
import ErrorContext from "../contexts/ErrorContext";

function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isCheckToken, setIsCheckToken] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (localStorage.jwt) {
      Promise.all([
        apiMain.getUserData(localStorage.jwt),
        apiMain.getMovies(localStorage.jwt),
      ])
        .then(([userData, dataMovies]) => {
          setSavedMovies(dataMovies.reverse());
          setCurrentUser(userData);
          setLoggedIn(true);
          setIsCheckToken(false);
        })
        .catch((err) => {
          console.error(`Ошибка при загрузке начальных данных ${err}`);
          setIsCheckToken(false);
          localStorage.clear();
        });
    } else {
      setLoggedIn(false);
      setIsCheckToken(false);
      localStorage.clear();
    }
  }, [loggedIn]);

  const setSuccess = useCallback(() => {
    setIsSuccess(false);
  }, []);

  function handleDeleteMovie(deletemovieId) {
    apiMain
      .deleteMovie(deletemovieId, localStorage.jwt)
      .then(() => {
        setSavedMovies(
          savedMovies.filter((movie) => {
            return movie._id !== deletemovieId;
          })
        );
      })
      .catch((err) => console.error(`Ошибка при удалении фильма ${err}`));
  }

  function handleToggleMovie(data) {
    console.log("handleToggleMovie - data", data);
    const isAdd = savedMovies.some((element) => data.id === element.movieId);
    const searchClickMovie = savedMovies.filter((movie) => {
      return movie.movieId === data.id;
    });
    if (isAdd) {
      handleDeleteMovie(searchClickMovie[0]._id);
    } else {
      apiMain
        .addMovie(data, localStorage.jwt)
        .then((res) => {
          setSavedMovies([res, ...savedMovies]);
        })
        .catch((err) => console.error(`Ошибка при установке лайка ${err}`));
    }
  }

  function handleRegister(name, email, password) {
    setIsSend(true);
    apiMain
      .registration(name, email, password)
      .then((res) => {
        if (res) {
          setLoggedIn(false);
          handleLogin(email, password);
        }
      })
      .catch((err) => {
        setIsError(true);
        console.error(`Ошибкак при регистрации ${err}`);
      })
      .finally(() => setIsSend(false));
  }

  function handleLogin(email, password) {
    setIsSend(true);
    apiMain
      .authorization(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        navigate("/movies");
      })
      .catch((err) => {
        setIsError(true);
        console.error(`Ошибкак при авторизации ${err}`);
      })
      .finally(() => setIsSend(false));
  }

  function logOut() {
    setLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
    localStorage.clear();
  }

  function editUserData(name, email) {
    setIsSend(true);
    apiMain
      .setUserInfo(name, email, localStorage.jwt)
      .then((res) => {
        setCurrentUser(res);
        setIsSuccess(true);
        setIsEdit(false);
      })
      .catch((err) => {
        setIsError(true);
        console.error(`Ошибкак при редактировании данных пользователя ${err}`);
      })
      .finally(() => setIsSend(false));
  }

  return (
    <div className="page__container">
      {isCheckToken ? (
        <Preloader />
      ) : (
        <CurrentUserContext.Provider value={currentUser}>
          <SendContext.Provider value={isSend}>
            <ErrorContext.Provider value={isError}>
              <Routes>
                <Route
                  path="/signin"
                  element={
                    loggedIn ? (
                      <Navigate to="/movies" replace />
                    ) : (
                      <Main
                        name="signin"
                        onLogin={handleLogin}
                        setIsError={setIsError}
                      />
                    )
                  }
                />

                <Route
                  path="/signup"
                  element={
                    loggedIn ?
                      <Navigate to="/movies" replace />:
                      <Main
                        name="signup"
                        onRegister={handleRegister}
                        setIsError={setIsError}
                      />
                  }
                />

                <Route
                  path="/"
                  element={
                    <>
                      <Header name="homepage" loggedIn={loggedIn} />
                      <Main name="homepage" />
                      <Footer />
                    </>
                  }
                />

                <Route
                  path="/movies"
                  element={
                    <ProtectedRoute
                      element={ProtectedRouteData}
                      name="movies"
                      savedMovies={savedMovies}
                      addMovie={handleToggleMovie}
                      loggedIn={loggedIn}
                      setIsError={setIsError}
                    />
                  }
                />

                <Route
                  path="/saved-movies"
                  element={
                    <ProtectedRoute
                      element={ProtectedRouteData}
                      name="savedmovies"
                      onDelete={handleDeleteMovie}
                      savedMovies={savedMovies}
                      loggedIn={loggedIn}
                      setIsError={setIsError}
                    />
                  }
                />

                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute
                      element={ProtectedRouteData}
                      name="profile"
                      loggedIn={loggedIn}
                      logOut={logOut}
                      editUserData={editUserData}
                      setIsError={setIsError}
                      isSuccess={isSuccess}
                      setSuccess={setSuccess}
                      setIsEdit={setIsEdit}
                      isEdit={isEdit}
                    />
                  }
                />

                <Route
                  path="*"
                  element={
                    <>
                      <Main name="error" />
                    </>
                  }
                />
              </Routes>
            </ErrorContext.Provider>
          </SendContext.Provider>
        </CurrentUserContext.Provider>
      )}
    </div>
  );
}

export default App;
