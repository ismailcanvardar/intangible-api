const mongoose = require("mongoose");

const auctionSchema = mongoose.Schema(
  {
    type: {
      type: String, // COLDIE or SCHEDULED
    },
    tokenId: {
      type: Number,
    },
    bidCount: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      default: "ACTIVE", // ACTIVE, CANCELLED, SETTLED
    },
    auctionCreator: {
      type: String,
    },
    reservePrice: {
      type: String,
    },
    startingBlock: {
      type: Number,
    },
    minimumBid: {
      type: String,
    },
    lengthOfAuction: {
      type: String,
    },
    startingDate: {
      type: Date,
    },
    endingDate: {
      type: Date,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true }, // So `toObject()` output includes virtuals
  }
);

auctionSchema.virtual('tokenDetails', {
  ref: 'Token', // The model to use
  localField: 'tokenId', // Find people where `localField`
  foreignField: 'tokenId', // is equal to `foreignField`
  // If `justOne` is true, 'members' will be a single doc as opposed to
  // an array. `justOne` is false by default.
  justOne: true
});

auctionSchema.virtual('lastBid', {
  ref: 'Bid', // The model to use
  localField: '_id', // Find people where `localField`
  foreignField: 'auctionId', // is equal to `foreignField`
  // If `justOne` is true, 'members' will be a single doc as opposed to
  // an array. `justOne` is false by default.
  justOne: true
});


module.exports = mongoose.model("Auction", auctionSchema);
