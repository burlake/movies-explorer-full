class ApiMain {
  constructor(options) {
    this._url = options.baseUrl;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(res.status);
  }

  _request(url, options) {
    return fetch(`${this._url}${url}`, options)
      .then(this._checkResponse)
  }

  registration(username, email, password) {

    return this._request("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: username,
        email: email,
        password: password,
      }),
    });
  }

  authorization(email, password) {
    return this._request("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
  }

  getUserData(token) {
    return this._request("/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  setUserInfo(name, email, token) {
    return this._request("/users/me", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    });
  }

  getMovies(token) {
    return this._request("/movies", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  addMovie(data, token) {
    console.log("data", data);
    return this._request("/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        description: data.description,
        year: data.year,
        image: `https://api.nomoreparties.co${data.image.url}`,
        trailerLink: data.trailerLink,
        thumbnail: `https://api.nomoreparties.co${data.image.formats.thumbnail.url}`,
        movieId: data.id,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
      }),
    });
  }

  deleteMovie(cardId, token) {
    return this._request(`/movies/${cardId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

//https://domain.nomoreparties.site
// Токен: ae20785e-e850-4452-960a-73f188fc9474
// Идентификатор группы: cohort-69

/*создаю экземпляр класса Api - baseUrl: 'https://api.movie-bur.nomoredomainswork.ru',*/
const apiMain = new ApiMain({
  baseUrl: "http://localhost:3000",
});

export default apiMain;
