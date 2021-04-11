const mongoose = require("mongoose");

const tokenSchema = mongoose.Schema({
  tokenId: {
    type: Number,
  },
  ipfsHash: {
    type: String,
  },
  txnHash: {
    type: String,
  },
  owner: {
    type: String,
  },
  creator: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Token", tokenSchema);
