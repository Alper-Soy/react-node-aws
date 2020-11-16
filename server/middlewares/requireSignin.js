const expressJwt = require('express-jwt');
require('dotenv').config();

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
  userProperty: 'user',
});
