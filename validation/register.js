const validator = require('validator'); // validate has a lot of built-in functions like isEmail(),isLength,...
const isEmpty = require('./is-empty'); // instead of installing lodash and use isEmpty() of that, we created that function.

module.exports = function validateRegisterInput (data) { // it's just a function that when it called, it takes some data and make sure that it's as the way as we want
  let errors = {}; // we create an empty errors object, so if there was an error, it gets fill

  data.name = !isEmpty(data.name) ? data.name : ''; // check to make sure that if data was empty, it should be an empty strin. not anything else
  data.email = !isEmpty(data.email) ? data.email : ''; // the isEmpty() method used here is the method we own created
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  // for example we check that username length must be between 2 and 30
  if (!validator.isLength(data.name, {min: 2,max: 30})) {
    errors.name = 'Name must be between 2 and 30 characters';
  }

  if (validator.isEmpty(data.name)) { // the isEmpty() method here comes from validator module, and it's not the method we created by ourselves.
    errors.name = 'Name feild is required!';
  }

  if (validator.isEmpty(data.email)) {
    errors.email = 'Email feild is required!';
  }

  if (!validator.isEmail(data.email)) {
    errors.email = 'Email is invalid!';
  }

  if (validator.isEmpty(data.password)) {
    errors.password = 'Password feild is required!';
  }

  if (!validator.isLength(data.password, {min: 6,max: 30})) {
    errors.password = 'Password needs to be between 6 and 30 characters';
  }

  if (validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm password feild is required!';
  }

  if (!validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match';
  }

  return {
    errors, // it means -> errors:errors , so if it's empty, it returns an empty object.
    isValid: isEmpty(errors) // and if it was empty,it returns true
  };
};
