const express = require('express');

const app = express();

const authRoutes = require('./routes/auth');

app.use('/api', authRoutes);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`API is running on port ${port}`);
});
