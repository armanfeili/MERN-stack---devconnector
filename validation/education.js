const validator = require('validator'); // validate has a lot of built-in functions like isEmail(),isLength,...
const isEmpty = require('./is-empty'); // instead of installing lodash and use isEmpty() of that, we created that function.

module.exports = function validateEducationInput (data) { // it's just a function that when it called, it takes some data and make sure that it's as the way as we want
  let errors = {}; // we create an empty errors object, so if there was an error, it gets fill

  // the required things - so we write these code then we can use validator.isEmpty() on them.
  data.school = !isEmpty(data.school) ? data.school : ''; // the isEmpty() method used here is the method we own created
  data.degree = !isEmpty(data.degree) ? data.degree : '';
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';
  data.from = !isEmpty(data.from) ? data.from : '';

  if (validator.isEmpty(data.school)) {
    errors.school = 'School field is required.';
  }
  if (validator.isEmpty(data.degree)) {
    errors.degree = 'Degree field is required.';
  }
  if (validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = 'Field of study field is required.';
  }
  if (validator.isEmpty(data.from)) {
    errors.from = 'From date field is required.';
  }

  return {
    errors, // it means -> errors:errors , so if it's empty, it returns an empty object.
    isValid: isEmpty(errors) // and if it was empty,it returns true
  };
};
