const express = require('express'); // to create app
const mongoose = require('mongoose'); // to connect db to the app
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path'); // this is a built-in module

const app = express();

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

// DB config
const db = require('./config/keys').mongoURI;

// connect to mongoDB
mongoose.connect(db, { useNewUrlParser: true }).then(() => console.log('MongoDB connected.')).catch((err) => console.log(err));

const port = process.env.PORT || 5000;

// Body parser middleware - we use bodyParser to access all data and info by typing "req.body()" in routes
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded -> parse the code from url
app.use(bodyParser.json()); // parse application/json -> parse the code from json code

// User routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
  // creating our route
  // here, we want to get anything that is not our api route, (not like: '/api/profile')
  app.get('*', (req, res) => {
    // for sending file , we need to add path module which is a built-in node module
    // __dirname is the current directory
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// passport middleware
app.use(passport.initialize());

// passport config - pass the passport to the passport.js file
require('./config/passport')(passport);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
