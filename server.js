const express = require('express');
const mongoose = require('mongoose');

const app = express();

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

// DB config
const db = require('./config/keys').mongoURI;

// connect to mongoDB
mongoose.connect(db).then(() => console.log('MongoDB connected.')).catch((err) => console.log(err));

const port = process.env.PORT || 5000;

// User routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
