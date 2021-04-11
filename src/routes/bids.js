const express = require("express");
const router = express.Router();

const { placeBid, getBids } = require("../controllers/bids");

router.get("/:auctionId", getBids);
router.post("/placeBid", placeBid);

module.exports = router;