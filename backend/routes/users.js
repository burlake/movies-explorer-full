const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUserMe, editUserData,
} = require('../controllers/users');

router.get('/me', getUserMe); // работает

// вынесла из констант getUserById
// router.get('/:userId', celebrate({ // работает
//   params: Joi.object().keys({
//     userId: Joi.string().min(24).max(24),
//   }),
// }), getUserById);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().pattern(/^\S+@\S+\.\S+$/),
  }),
}), editUserData);

module.exports = router;
