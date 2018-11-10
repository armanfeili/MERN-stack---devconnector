const validator = require('validator'); // validate has a lot of built-in functions like isEmail(),isLength,...
const isEmpty = require('./is-empty'); // instead of installing lodash and use isEmpty() of that, we created that function.

module.exports = function validateExperienceInput (data) { // it's just a function that when it called, it takes some data and make sure that it's as the way as we want
  let errors = {}; // we create an empty errors object, so if there was an error, it gets fill

  // the required things - so we write these code then we can use validator.isEmpty() on them.
  data.title = !isEmpty(data.title) ? data.title : ''; // the isEmpty() method used here is the method we own created
  data.company = !isEmpty(data.company) ? data.company : '';
  data.from = !isEmpty(data.from) ? data.from : '';

  if (validator.isEmpty(data.title)) {
    errors.title = 'Job title field is required.';
  }
  if (validator.isEmpty(data.company)) {
    errors.company = 'Company field is required.';
  }
  if (validator.isEmpty(data.from)) {
    errors.from = 'From date field is required.';
  }

  return {
    errors, // it means -> errors:errors , so if it's empty, it returns an empty object.
    isValid: isEmpty(errors) // and if it was empty,it returns true
  };
};
