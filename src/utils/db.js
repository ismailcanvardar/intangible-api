const mongoose = require("mongoose");

const connect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://mythi:Is2gv3437!@cluster0.pjp4v.mongodb.net/intangible_test?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  connect,
};
