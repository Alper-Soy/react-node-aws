const User = require('../models/user');
const AWS = require('aws-sdk');
const jwt = require('jsonwebtoken');
const {
  registerEmailParams,
  forgotPasswordEmailParams,
} = require('../helpers/email');
const shortId = require('shortid');
const _ = require('lodash');

require('dotenv').config();

AWS.config.update({
  // accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  // secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const ses = new AWS.SES({ apiVersion: '2010-12-01' });

exports.register = (req, res) => {
  // console.log('REGISTER CONTROLLER', req.body);
  const { name, email, password } = req.body;
  // check if user already exist in db
  User.findOne({ email }).exec((err, user) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Server error!');
    }
    if (user) return res.status(400).json({ error: 'Email is taken' });

    // generate token with user name, email and password
    const token = jwt.sign(
      { name, email, password },
      process.env.JWT_ACCOUNT_ACTIVATION,
      {
        expiresIn: '10m',
      }
    );

    // send email
    const params = registerEmailParams(email, token);

    const sendEmailOnRegister = ses.sendEmail(params).promise();

    sendEmailOnRegister
      .then((data) => {
        // console.log('email submitted to SES', data);
        res.json({
          message: `Email has been sent to ${email}, Follow the instructions to complete your registration`,
        });
      })
      .catch((error) => {
        console.log('ses email on register', error);
        res.status(error.statusCode).json({
          message: 'We could not verify your email. Please try again.',
        });
      });
  });
};

exports.registerActivate = (req, res) => {
  const { token } = req.body;
  jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, (err, decoded) => {
    // console.log(decoded);
    if (err) {
      console.log(err);
      return res.status(401).json({ error: 'Expired link. Try again' });
    }

    // const { name, email, password } = jwt.decode(token);
    const { name, email, password } = decoded;
    const username = shortId.generate();

    User.findOne({ email }).exec((err, userExist) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Server error!');
      }
      if (userExist) return res.status(400).json({ error: 'Email is taken' });

      const user = new User({ username, name, email, password });
      user.save((err, user) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: 'Server error!' });
        }

        return res.json({ message: 'Registration success. Please login!' });
      });
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).exec((err, user) => {
    if (err || !user)
      return res.status(400).json({
        error: 'User with that email does not exist. Please register.',
      });

    // authenticate
    if (!user.authenticate(password))
      return res.status(400).json({
        error: 'Email and password do not match!.',
      });

    // generate token and send to client
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
    const { _id, name, role } = user;

    return res.json({
      token,
      user: { _id, name, email, role },
    });
  });
};

exports.forgotPassword = (req, res) => {
  const { email } = req.body;
  // check if user exists with that email
  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'User with that email does not exist',
      });
    }

    // generate token and email to user
    const token = jwt.sign(
      { name: user.name },
      process.env.JWT_RESET_PASSWORD,
      { expiresIn: '10m' }
    );
    // send email
    const params = forgotPasswordEmailParams(email, token);

    // populate the db > user > resetPasswordLink
    return user.updateOne({ resetPasswordLink: token }, (err, success) => {
      if (err) {
        return res.status(400).json({
          error: 'Password reset failed. Try later.',
        });
      }

      const sendEmail = ses.sendEmail(params).promise();

      sendEmail
        .then((data) => {
          // console.log('ses reset pw success', data);
          return res.json({
            message: `Email has been sent to ${email}. Click on the link to reset your password`,
          });
        })
        .catch((error) => {
          console.log('ses reset pw failed', error);
          return res.json({
            message: `We could not vefiry your email. Try later.`,
          });
        });
    });
  });
};

exports.resetPassword = (req, res) => {
  const { resetPasswordLink, newPassword } = req.body;

  jwt.verify(
    resetPasswordLink,
    process.env.JWT_RESET_PASSWORD,
    (err, success) => {
      if (err) {
        return res.status(400).json({
          error: 'Expired Link. Try again.',
        });
      }

      User.findOne({ resetPasswordLink }).exec((err, user) => {
        if (err || !user) {
          return res.status(400).json({
            error: 'Invalid token. Try again',
          });
        }

        const updatedFields = {
          password: newPassword,
          resetPasswordLink: '',
        };

        user = _.extend(user, updatedFields);

        user.save((err, result) => {
          if (err) {
            return res.status(400).json({
              error: 'Password reset failed. Try again',
            });
          }

          res.json({
            message: `Great! Now you can login with your new password`,
          });
        });
      });
    }
  );
};
