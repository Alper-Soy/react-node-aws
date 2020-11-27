const Category = require('../models/category');
const slugify = require('slugify');
const { v4: uuidv4 } = require('uuid');
const formidable = require('formidable');
const AWS = require('aws-sdk');
const fs = require('fs');
require('dotenv').config();

// s3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

exports.list = (req, res) => {
  Category.find({}).exec((err, data) => {
    if (err) return res.status(400).json({ error: 'Category could not load!' });

    res.json(data);
  });
};

exports.read = (req, res) => {};

exports.create = (req, res) => {
  const { name, image, content } = req.body;
  // console.log('image => ', image);
  // image data
  const base64Data = new Buffer.from(
    image.replace(/^data:image\/\w+;base64,/, ''),
    'base64'
  );
  // console.log('base64Data => ', base64Data);
  const type = image.split(';')[0].split('/')[1];
  // console.log('type => ', type);

  const slug = slugify(name);
  let category = new Category({ name, content, slug });

  const params = {
    Bucket: 'hackr-alper',
    Key: `category/${uuidv4()}.${type}`,
    Body: base64Data,
    ACL: 'public-read',
    ContentEncoding: 'base64',
    ContentType: `image/${type}`,
  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).json({ error: 'Upload to s3 failed' });
    }
    console.log('AWS UPLOAD RES DATA', data);
    category.image.url = data.Location;
    category.image.key = data.Key;
    category.postedBy = req.user._id;

    // save to db
    category.save((err, success) => {
      if (err) {
        console.log(err);
        res.status(400).json({ error: 'Duplicate category' });
      }
      return res.json(success);
    });
  });
};

exports.update = (req, res) => {};

exports.remove = (req, res) => {};
