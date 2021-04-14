const express = require("express");
const router = express.Router();

const { updateUser, getUser } = require("../controllers/users");

router.post("/update/:address", updateUser);
router.get("/:address", getUser);

module.exports = router;