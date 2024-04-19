const router = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const signupRouter = require('./signup');
const signinRouter = require('./signin');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

router.use('/signup', signupRouter); // работает
router.use('/signin', signinRouter); // работает
router.use(auth);
router.use('/users', usersRouter); // работает
router.use('/movies', moviesRouter); // работает

router.use('*', (req, res, next) => {
  next(new NotFoundError('Страницы нет'));
});

module.exports = router;
