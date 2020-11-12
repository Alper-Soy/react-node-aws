const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose
  .connect(process.env.DATABASE_CLOUD, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connected'))
  .catch((err) => console.log(err));

const app = express();

const authRoutes = require('./routes/auth');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors({ origin: process.env.CLIENT_URL }));

app.use('/api', authRoutes);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`API is running on port ${port}`);
});
