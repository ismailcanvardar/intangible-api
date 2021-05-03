const express = require("express");
const router = express.Router();

const { updateUser, getUser, searchUser, getUsername } = require("../controllers/users");

router.get("/getUsername/:address", getUsername);
router.get("/find/:searchParameter", searchUser);
router.post("/update/:address", updateUser);
router.get("/:address", getUser);

module.exports = router;