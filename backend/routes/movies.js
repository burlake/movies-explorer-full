const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  addMovie, getMovies, deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies); // работает

router.post('/', celebrate({ // работает
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/),
    trailerLink: Joi.string().required().pattern(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/),
    thumbnail: Joi.string().required().pattern(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), addMovie);

router.delete('/:movieId', celebrate({ // работает
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex()
      .required(),
  }),
}), deleteMovie);

// router.put('/:movieId/likes', celebrate({
//   params: Joi.object().keys({
//     movieId: Joi.string().min(24).max(24),
//   }),
// }), likeMovie);

// router.delete('/:movieId/likes', celebrate({
//   params: Joi.object().keys({
//     movieId: Joi.string().min(24).max(24),
//   }),
// }), dislikeMovie);

module.exports = router;

// GET /cards — возвращает все карточки
// POST /cards — создаёт карточку
// DELETE /cards/:cardId — удаляет карточку по идентификатору
// PUT /cards/:cardId/likes — поставить лайк карточке
// DELETE /cards/:cardId/likes — убрать лайк с карточки
