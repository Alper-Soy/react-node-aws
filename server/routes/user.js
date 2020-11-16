const express = require('express');

const router = express.Router();

// controllers
const { read } = require('../controllers/user');

// middlewares
const { requireSignin } = require('../middlewares/requireSignin');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { adminMiddleware } = require('../middlewares/adminMiddleware');

router.get('/user', requireSignin, authMiddleware, read);
router.get('/admin', requireSignin, adminMiddleware, read);

module.exports = router;
