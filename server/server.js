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
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connected'))
  .catch((err) => console.log(err));

const app = express();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const linkRoutes = require('./routes/link');

app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '5mb', type: 'application/json' }));
app.use(cors({ origin: process.env.CLIENT_URL }));

app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', linkRoutes);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`API is running on port ${port}`);
});
