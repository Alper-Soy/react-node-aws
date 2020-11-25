const express = require('express');

const router = express.Router();

// validators
const {
  categoryCreateValidator,
  categoryUpdateValidator,
} = require('../validators/category');
const { runValidation } = require('../validators');

// middlewares
const { requireSignin } = require('../middlewares/requireSignin');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { adminMiddleware } = require('../middlewares/adminMiddleware');

// controllers
const {
  list,
  read,
  create,
  update,
  remove,
} = require('../controllers/category');

// routes
router.get('/categories', list);
router.get('/category/:slug', read);
router.post('/category', requireSignin, adminMiddleware, create);
router.put(
  '/category/:slug',
  categoryUpdateValidator,
  runValidation,
  requireSignin,
  adminMiddleware,
  update
);
router.delete('/category/:slug', requireSignin, adminMiddleware, remove);

module.exports = router;
