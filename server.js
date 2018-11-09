const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const app = express();

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

// DB config
const db = require('./config/keys').mongoURI;

// connect to mongoDB
mongoose.connect(db, { useNewUrlParser: true }).then(() => console.log('MongoDB connected.')).catch((err) => console.log(err));

const port = process.env.PORT || 5000;

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded -> parse the code from url
app.use(bodyParser.json()); // parse application/json -> parse the code from json code

// User routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

// passport middleware
app.use(passport.initialize());

// passport config
require('./config/passport')(passport);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
