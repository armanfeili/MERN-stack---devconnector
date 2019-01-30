const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// anytime we create a user or an object with a model (like here) ,
// it automatically creates an objectID as _id for this particular object.
// so we can (need to) add this id to our payload anytime we wanted to access a user and jwt it.

module.exports = User = mongoose.model('users', UserSchema); // 'users' is the name of collection and we put our UserSchema to that
