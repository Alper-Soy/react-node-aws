const express = require('express');

const router = express.Router();

// validators
const {
  userRegisterValidator,
  userLoginValidator,
} = require('../validators/auth');
const { runValidation } = require('../validators');

// controllers
const { register, registerActivate, login } = require('../controllers/auth');

// middlewares
const { requireSignin } = require('../middlewares/requireSignin');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { adminMiddleware } = require('../middlewares/adminMiddleware');

router.post('/register', userRegisterValidator, runValidation, register);
router.post('/register/activate', registerActivate);
router.post('/login', userLoginValidator, runValidation, login);
router.get('/secret', requireSignin, authMiddleware, (req, res) => {
  res.json({ user: req.profile });
});

module.exports = router;
