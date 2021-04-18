const express = require("express");
const router = express.Router();

const { placeBid, getBids, cancelBid } = require("../controllers/bids");

router.get("/:auctionId", getBids);
router.post("/placeBid", placeBid);
router.post("/cancelBid", cancelBid);

module.exports = router;