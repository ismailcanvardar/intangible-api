const express = require("express");
const router = express.Router();

const { updateUser, getUser, searchUser } = require("../controllers/users");

router.get("/find/:searchParameter", searchUser);
router.post("/update/:address", updateUser);
router.get("/:address", getUser);

module.exports = router;