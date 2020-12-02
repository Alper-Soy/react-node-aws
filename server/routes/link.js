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
const {
  create,
  list,
  read,
  update,
  remove,
  clickCount,
} = require('../controllers/link');

// routes
router.post('/links', requireSignin, adminMiddleware, list);
router.get('/link/:id', read);
router.post(
  '/link',
  linkCreateValidator,
  runValidation,
  requireSignin,
  authMiddleware,
  create
);
router.put('/click-count', clickCount);
router.put(
  '/link/:id',
  linkUpdateValidator,
  runValidation,
  requireSignin,
  authMiddleware,
  update
);
router.delete('/link/:id', requireSignin, authMiddleware, remove);

module.exports = router;
