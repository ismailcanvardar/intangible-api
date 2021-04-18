const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  profilePhoto: {
    type: String,
    default: null
  },
  coverPhoto: {
    type: String,
    default: null
  },
  username: {
    type: String,
    default: null
  },
  name: {
    type: String,
    default: null
  },
  description: {
    type: String,
    default: null
  },
  instagramUsername: {
    type: String,
    default: null
  },
  twitterUsername: {
    type: String,
    default: null
  },
  website: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("User", userSchema);
