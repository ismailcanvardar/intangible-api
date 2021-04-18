const express = require("express");
const router = express.Router();

const {
  cancelAuction,
  createColdieAuction,
  createScheduledAuction,
  settleAuction,
  getAuction,
  getAuctions,
  getLive,
  getReserveNotMet,
  getSold,
} = require("../controllers/auctions");

router.post("/createColdieAuction", createColdieAuction);
router.post("/createScheduledAuction", createScheduledAuction);
router.post("/cancelAuction", cancelAuction);
router.post("/settleAuction", settleAuction);
router.get("/", getAuctions);
router.get("/live", getLive);
router.get("/reservenotmet", getReserveNotMet);
router.get("/sold", getSold);
router.get("/:tokenId", getAuction);

module.exports = router;
