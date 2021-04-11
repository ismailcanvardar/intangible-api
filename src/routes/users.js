const express = require("express");
const router = express.Router();

const { createUser, updateUser, getUser } = require("../controllers/users");

router.post("/create", createUser);
router.post("/update/:address", updateUser);
router.get("/:address", getUser);

module.exports = router;