const express = require('express');

const router = express.Router();

// validators
const { userRegisterValidator } = require('../validators/auth');
const { runValidation } = require('../validators');

// controllers
const { register, registerActivate } = require('../controllers/auth');

router.post('/register', userRegisterValidator, runValidation, register);
router.post('/register/activate', registerActivate);

module.exports = router;
