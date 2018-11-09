const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const profileSchema = new Schema({
  // we do want to associate the avatar and everything that's in the user schema with that profile
  user: {
    type: Schema.Types.ObjectId, // it's going to associate the user by its ID. ***
    ref: 'users' // we need to reference the collection that this refers to, because maybe we had different collections
  },
  handle: { // this is about a person's profile route, like: devconnector.com/profile/BradTravesty
    type: String,
    required: true,
    max: 40
  },
  company: { // This is not required
    type: String
  },
  location: { // This is not required
    type: String
  },
  website: { // This is not required
    type: String
  },
  status: { // developers should select an option between junior,senior,fullStack,...
    type: String,
    required: true
  },
  skills: { // this should be an array of strings
    type: [String], // in our form, it will be seperated values
    required: true
  },
  bio: {
    type: String
  },
  githubusername: {
    type: String
  },
  experience: [ // it will be an array of objects
    {
      title: {
        type: String,
        rquired: true
      },
      company: {
        type: String,
        rquired: true
      },
      location: {
        type: String
      },
      from: {
        type: Date,
        rquired: true
      },
      to: {
        type: Date,
        rquired: true
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  education: [ // it will be an array of objects
    {
      school: {
        type: String,
        rquired: true
      },
      degree: {
        type: String,
        rquired: true
      },
      fieldOfStudy: {
        type: String
      },
      from: {
        type: Date,
        rquired: true
      },
      to: {
        type: Date,
        rquired: true
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  social: { // social media links
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }

});

module.exports = Profile = mongoose.model('profile', profileSchema);
