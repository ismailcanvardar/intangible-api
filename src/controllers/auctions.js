const Auction = require("../models/Auction");
const Token = require("../models/Token");
const Bid = require("../models/Bid");

const createColdieAuction = async (req, res) => {
  const {
    tokenId,
    auctionCreator,
    reservePrice,
    lengthOfAuction,
    startingDate,
    endingDate,
  } = req.body;

  try {
    const foundAuction = await Auction.findOne({ tokenId, status: "ACTIVE" });
    const foundToken = await Token.findOne({ tokenId });

    if (!foundAuction && foundToken) {
      const newAuction = new Auction({
        tokenId,
        auctionCreator,
        reservePrice,
        lengthOfAuction,
        startingDate,
        endingDate,
        type: "COLDIE",
      });

      const savedAuction = await newAuction.save();

      res.status(200).json(savedAuction);
    } else {
      res.send(false);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

const createScheduledAuction = async (req, res) => {
  const {
    tokenId,
    auctionCreator,
    startingBlock,
    minimumBid,
    lengthOfAuction,
    startingDate,
    endingDate,
  } = req.body;

  try {
    const foundAuction = await Auction.findOne({ tokenId, status: "ACTIVE" });
    const foundToken = await Token.findOne({ tokenId });

    if (!foundAuction && foundToken) {
      const newAuction = new Auction({
        tokenId,
        auctionCreator,
        startingBlock,
        minimumBid,
        lengthOfAuction,
        startingDate,
        endingDate,
        type: "SCHEDULED",
      });

      const savedAuction = await newAuction.save();

      res.status(200).json(savedAuction);
    } else {
      res.send(false);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

const settleAuction = async (req, res) => {
  const { tokenId } = req.body;

  try {
    const foundAuction = await Auction.findOne({ status: "ACTIVE", tokenId });

    if (foundAuction !== null && foundAuction !== undefined) {
      const lastBid = await Bid.findOne({ auctionId: foundAuction._id }).sort({createdAt: -1}).limit(1);
      if (lastBid !== null && lastBid !== undefined) {
        await Token.updateOne({ tokenId }, { owner: lastBid.from });
      }
      await foundAuction.update({ status: "SETTLED" });
      res.status(200).send(true);
    } else {
      res.status(500).send(false);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

const cancelAuction = async (req, res) => {
  const { tokenId } = req.body;
  try {
    const foundAuction = await Auction.findOne({ status: "ACTIVE", tokenId });
    // await Auction.updateOne({ tokenId }, { status: "CANCELLED" });
    if (foundAuction) {
      await foundAuction.update({ status: "CANCELLED" });
      res.status(200).send(true);
    } else {
      res.status(500).send(false);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

const getAuction = async (req, res) => {
  const { tokenId } = req.params;
  try {
    Auction.findOne({
      tokenId,
      status: "ACTIVE",
    })
      .populate("tokenDetails")
      .exec((error, tokenDetail) => {
        if (tokenDetail) {
          res.status(200).json(tokenDetail);
        } else if (error && !tokenDetail) {
          res.status(200).send(false);
        }
      });
  } catch (err) {
    res.status(500).send(err);
  }
};

const getAuctions = async (req, res) => {
  try {
    Auction.find({
      status: "ACTIVE",
    })
      .populate("tokenDetails")
      .populate({ path: "lastBid", options: { sort: { createdAt: -1 } } })
      .exec((error, tokenDetail) => {
        if (tokenDetail) {
          res.status(200).json(tokenDetail);
        } else if (error && !tokenDetail) {
          res.status(200).send(false);
        }
      });
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  createColdieAuction,
  createScheduledAuction,
  settleAuction,
  cancelAuction,
  getAuction,
  getAuctions,
};
