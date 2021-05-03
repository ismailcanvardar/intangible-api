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

const getUsername = async (req, res) => {
  const { address } = req.params;

  try {
    const user = await User.findOne({ address });

    if (!user) {
      res.status(200).send(false);
    } else {
      res.status(200).send(user.username);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

const updateUser = async (req, res) => {
  // const {
  //   profilePhoto,
  //   coverPhoto,
  //   username,
  //   name,
  //   instagramUsername,
  //   twitterUsername,
  //   website,
  // } = req.body;

  const { address } = req.params;
  console.log(req.body);

  try {
    const foundUser = await User.findOne({ address });
    if (!foundUser) {
      const newUser = new User(req.body);
      const savedUser = await newUser.save();
      res.status(200).json(savedUser);
    } else {
      if (req.body !== {}) {
        await User.updateOne({ address }, req.body);
      }
      res.status(200).send(true);
    }
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

const searchUser = async (req, res) => {
  const { searchParameter } = req.params;

  try {
    User.find(
      {
        $or: [
          {
            name: { $regex: searchParameter, $options: "i" },
          },
          {
            username: { $regex: searchParameter, $options: "i" },
          },
          {
            address: { $regex: searchParameter, $options: "i" },
          },
        ],
      },
      function (err, docs) {
        if (err) res.send(err).status(500);

        if (docs.length === 0) {
          res.send(false).status(200);
        } else {
          res.json(docs).status(200);
        }
      }
    );
  } catch (err) {
    res.send(err).status(500);
  }
};

module.exports = {
  createUser,
  updateUser,
  getUser,
  searchUser,
  getUsername
};
