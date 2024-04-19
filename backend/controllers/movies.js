const mongoose = require('mongoose');
const httpConstants = require('http2').constants;
const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.addMovie = (req, res, next) => { // было addCard + name, link
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((card) => {
      Movie.findById(card)
        .orFail()
        .then((data) => res.status(httpConstants.HTTP_STATUS_CREATED).send(data))
        .catch((err) => {
          if (err instanceof mongoose.Error.DocumentNotFoundError) {
            next(new NotFoundError('Фильма с таким id нет - module.exports.addMovie'));
          } else {
            next(err);
          }
        });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail()
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        throw new ForbiddenError('Карточка другого пользователя'); // 403
      }
      Movie.deleteOne(card)
        .orFail()
        .then(() => {
          res.status(httpConstants.HTTP_STATUS_OK).send({ message: 'Карточка удалена' });
        })
        .catch((err) => {
          if (err instanceof mongoose.Error.CastError) {
            next(new BadRequestError('Некорректный _id карточки - 400'));
          } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
            next(new NotFoundError('Карточка с _id не найдена - 404'));
          } else {
            next(err);
          }
        });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError('Карточка с _id не найдена - 404'));
      } else {
        next(err);
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  Movie.findByIdAndUpdate(req.params.movieId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail()
    .then((card) => {
      res.status(httpConstants.HTTP_STATUS_OK).send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError('Некорректный _id карточки - 400'));
      } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError('Карточка с _id не найдена - 404'));
      } else {
        next(err);
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Movie.findByIdAndUpdate(req.params.movieId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail()
    .then((card) => {
      res.status(httpConstants.HTTP_STATUS_OK).send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError('Некорректный _id карточки - 400'));
      } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError('Карточка с _id не найдена - 404'));
      } else {
        next(err);
      }
    });
};
