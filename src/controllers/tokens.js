const Token = require("../models/Token");

const createToken = async (req, res) => {
  try {
    const { tokenId, ipfsHash, txnHash, creator } = req.body;

    const foundToken = await Token.findOne({ tokenId });

    if (!foundToken) {
      const newToken = new Token({
        tokenId,
        ipfsHash,
        txnHash,
        owner: creator,
        creator,
      });

      const savedToken = await newToken.save();
      res.status(200).json(savedToken);
    } else {
      res.status(500).send(false);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

const getTokens = async (req, res) => {
  const { accountAddress } = req.params;

  try {
    const foundTokens = await Token.find({ owner: accountAddress });

    if (foundTokens) {
      res.status(200).json(foundTokens);
    } else {
      res.status(200).send([]);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  createToken,
  getTokens,
};
