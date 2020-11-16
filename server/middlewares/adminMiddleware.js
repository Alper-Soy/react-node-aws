const User = require('../models/user');

exports.adminMiddleware = (req, res, next) => {
  const adminUserId = req.user._id;

  User.findById({ _id: adminUserId }).exec((err, user) => {
    if (err || !user) {
      console.log(err);
      return res.status(400).json({ error: 'User not found' });
    }

    if (user.role !== 'admin')
      return res.status(400).json({ error: 'Admin resource. Access denied!' });

    req.profile = user;
    next();
  });
};
