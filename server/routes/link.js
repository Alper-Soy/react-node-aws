const express = require('express');
const router = express.Router();

// validators
const {
  linkCreateValidator,
  linkUpdateValidator,
} = require('../validators/link');
const { runValidation } = require('../validators');

// middlewares
const { requireSignin } = require('../middlewares/requireSignin');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { adminMiddleware } = require('../middlewares/adminMiddleware');

// controllers
const { create, list, read, update, remove } = require('../controllers/link');

// routes
router.get('/links', list);
router.get('/link/:slug', read);
router.post(
  '/link',
  linkCreateValidator,
  runValidation,
  requireSignin,
  authMiddleware,
  create
);
router.put(
  '/link/:slug',
  linkUpdateValidator,
  runValidation,
  requireSignin,
  authMiddleware,
  create
);
router.delete('/link/:slug', requireSignin, authMiddleware, remove);

module.exports = router;
