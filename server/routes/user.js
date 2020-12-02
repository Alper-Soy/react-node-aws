const express = require('express');

const router = express.Router();

// controllers
const { read, update } = require('../controllers/user');

// validators
const { userUpdateValidator } = require('../validators/auth');
const { runValidation } = require('../validators');

// middlewares
const { requireSignin } = require('../middlewares/requireSignin');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { adminMiddleware } = require('../middlewares/adminMiddleware');

router.get('/user', requireSignin, authMiddleware, read);
router.get('/admin', requireSignin, adminMiddleware, read);
router.put(
  '/user',
  userUpdateValidator,
  runValidation,
  requireSignin,
  authMiddleware,
  update
);

module.exports = router;
