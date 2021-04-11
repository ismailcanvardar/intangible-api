const express = require("express");
const router = express.Router();

const { createToken, getTokens } = require("../controllers/tokens");

router.post("/create", createToken);
router.get("/:accountAddress", getTokens);

module.exports = router;
