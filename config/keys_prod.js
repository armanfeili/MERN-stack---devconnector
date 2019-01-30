// in keys_prod.js, we're actually going to use Enviroment variable
module.exports = {
  mongoURI: process.env.MONGO_URI,
  secretOrKey: process.env.SECRET_OR_KEY
};

// the process.env.MONGO_URI, and the process.env.SECRET_OR_KEY, are somthing
// that just server can findout what's they are.
// so they're suitable for pushing to servers like heroku or so on
