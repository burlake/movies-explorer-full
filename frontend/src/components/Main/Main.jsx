import Error from "../Error - 404/Error";
import Landing from "../Landing/Landing";
import Login from "../Login/Login";
import Movies from "../Movies/Movies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import SavedMovies from "../SavedMovies/SavedMovies";
import Footer from "../Footer/Footer";

function Main({
  name,
  savedMovies,
  addMovie,
  setIsError,
  onDelete,
  onLogin,
  logOut,
  editUserData,
  isSuccess,
  setSuccess,
  setIsEdit,
  isEdit,
  onRegister,
}) {
  return (
    <main className="main">
      {
        {
          homepage: (
            <>
              <Landing />
            </>
          ),
          signin: (
            <Login name={name} onLogin={onLogin} setIsError={setIsError} />
          ),
          signup: (
            <Register
              onRegister={onRegister}
              name={name}
              setIsError={setIsError}
            />
          ),
          error: <Error />,
          profile: (
            <Profile
              name={name}
              logOut={logOut}
              editUserData={editUserData}
              setIsError={setIsError}
              isSuccess={isSuccess}
              setSuccess={setSuccess}
              setIsEdit={setIsEdit}
              isEdit={isEdit}
            />
          ),
          movies: (
            <>
              <Movies
                savedMovies={savedMovies}
                addMovie={addMovie}
                setIsError={setIsError}
              />
              <Footer />
            </>
          ),
          savedmovies: (
            <>
              <SavedMovies
                savedMovies={savedMovies}
                onDelete={onDelete}
                setIsError={setIsError}
              />
              <Footer />
            </>
          ),
        }[name]
      }
    </main>
  );
}

export default Main;
