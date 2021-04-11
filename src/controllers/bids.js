const Bid = require("../models/Bid");
const Auction = require("../models/Auction");
const Web3 = require("web3");

const placeBid = async (req, res) => {
  const { auctionId, amount, from, createdAt } = req.body;

  try {
    const newBid = new Bid({
      auctionId,
      amount,
      from,
      createdAt
    });

    const savedBid = await newBid.save();
    res.status(200).json(savedBid);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getBids = async (req, res) => {
  const { auctionId } = req.params;

  console.log(auctionId);
  try {
    const bids = await Bid.find({ auctionId }).sort({ createdAt: -1 });

    res.status(200).json(bids);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  placeBid,
  getBids,
};
