const mongoose = require("mongoose");

const bidSchema = mongoose.Schema({
  auctionId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Auction",
    required: true
  },
  amount: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true
  },
});

module.exports = mongoose.model("Bid", bidSchema);
