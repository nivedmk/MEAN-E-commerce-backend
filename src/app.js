const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const itemrouter = require("./router/items.Router");
const userRouter = require("./router/user.Router");
const cartRouter = require("./router/cart.router");
const wishListRouter = require("./router/wishList.router");

app.use(cors());
app.use(bodyParser.json());
app.use("/item", itemrouter);
app.use("/users", userRouter);
app.use("/cart", cartRouter);
app.use("/wish-list", wishListRouter);

module.exports = app;
