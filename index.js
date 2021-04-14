const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { connect } = require("./src/utils/db");
const auctionRoutes = require("./src/routes/auctions");
const bidRoutes = require("./src/routes/bids");
const tokenRoutes = require("./src/routes/tokens");
const userRoutes = require("./src/routes/users");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/auctions", auctionRoutes);
app.use("/bids", bidRoutes);
app.use("/tokens", tokenRoutes);
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Intangible API.");
});

const PORT = "5000" || process.env.PORT;

connect()
  .then(() => {
    console.log("Connected to DB.");
    app.listen(PORT, () => console.log(`Server has started at port ${PORT}.`));
  })
  .catch((err) => console.log(err));
