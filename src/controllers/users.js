const User = require("../models/User");

const createUser = async (req, res) => {
  const { address } = req.body;

  try {
    const user = await User.findOne({ address });

    if (!user) {
      const newUser = new User({ address });
      const savedUser = await newUser.save();
      res.json(savedUser).status(200);
    } else {
      res.status(500).send(false);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

const updateUser = async (req, res) => {
  const {
    profilePhoto,
    username,
    instagramUsername,
    twitterUsername,
    website,
  } = req.body;

  const { address } = req.params;

  try {
    await User.updateOne(
      { address },
      { profilePhoto, username, instagramUsername, twitterUsername, website }
    );

    res.status(200).send(true);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getUser = async (req, res) => {
  const { address } = req.params;

  try {
    const user = await User.findOne({ address });

    res.json(user).status(200);
  } catch (err) {
    res.send(err).status(500);
  }
};

module.exports = {
  createUser,
  updateUser,
  getUser
};
