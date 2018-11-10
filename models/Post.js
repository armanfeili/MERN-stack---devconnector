const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  text: {
    type: String,
    required: true
  },
  // we could do what we did in profile.js and populate name and avatar from 'users',like
  // populate('user', ['name', 'avatar'])  , but we want comments to stay even if user deleted his account
  // name and avatar are not the things that we want user to input, they will come from ObjectID
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  // we want any user to like once, so likes is an array of objects
  likes: [
    {
      user: { // once they like,their user id (ObjectId) will go into this array
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  comments: [ // comments on any post -> comment also need name and avatar
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model('post', postSchema);
