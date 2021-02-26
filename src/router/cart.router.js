const express = require("express");
const auth = require("../middleware/auth");
const Cart = require("../models/cart.model");

const cartRouter = express.Router();

cartRouter.get("/getall", auth, async (req, res) => {
  try {
    const cart = await Cart.find({ owner: req.user._id });
    res.status(200).send(cart);
  } catch (e) {
    res.status(500).send(e);
  }
});

cartRouter.post("/add", auth, async (req, res) => {
  let cart = new Cart({
    ...req.body,
    owner: req.user._id,
  });

  try {
    cart = await cart.getItem(req.body._id);
    await cart.save();
    res.status(201).send({ cart, message: "SUCCESS" });
  } catch (e) {
    // console.log(error);
    res.status(400).send({ e, message: "error" });
  }
});

cartRouter.delete("/delete/:id", auth, async (req, res) => {
  try {
    const cart = await Cart.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!cart) {
      return res.status(400).send({ err: "Error on deleting" });
    }
    res.status(202).send({ cart, message: "SUCCESS" });
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = cartRouter;
