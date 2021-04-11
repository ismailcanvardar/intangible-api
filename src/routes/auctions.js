const express = require("express");
const router = express.Router();

const {
  cancelAuction,
  createColdieAuction,
  createScheduledAuction,
  settleAuction,
  getAuction,
  getAuctions,
} = require("../controllers/auctions");

router.post("/createColdieAuction", createColdieAuction);
router.post("/createScheduledAuction", createScheduledAuction);
router.post("/cancelAuction", cancelAuction);
router.post("/settleAuction", settleAuction);
router.get("/:tokenId", getAuction);
router.get("/", getAuctions);

module.exports = router;