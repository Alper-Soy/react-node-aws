const User = require('../models/user');

exports.authMiddleware = (req, res, next) => {
  const authUserId = req.user._id;

  User.findById({ _id: authUserId }).exec((err, user) => {
    if (err || !user) {
      console.log(err);
      return res.status(400).json({ error: 'User not found' });
    }

    req.profile = user;
    next();
  });
};
