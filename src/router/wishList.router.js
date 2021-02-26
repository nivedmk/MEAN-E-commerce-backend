const express = require("express");
const auth = require("../middleware/auth");
const WishList = require("../models/wishList.model");

const wishListRouter = express.Router();

wishListRouter.get("/getall", auth, async (req, res) => {
  try {
    const wishList = await WishList.find({ owner: req.user._id });
    res.status(200).send(wishList);
  } catch (e) {
    res.status(500).send(e);
  }
});

wishListRouter.post("/add", auth, async (req, res) => {
  let wishList = new WishList({
    ...req.body,
    owner: req.user._id,
  });

  try {
    wishList = await wishList.getItem(req.body._id);
    await wishList.save();
    res.status(201).send({ wishList, message: "SUCCESS" });
  } catch (e) {
    // console.log(error);
    res.status(400).send({ e, message: "error" });
  }
});

wishListRouter.delete("/delete/:id", auth, async (req, res) => {
  try {
    const wishList = await WishList.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!wishList) {
      return res.status(400).send({ err: "Error on deleting" });
    }
    res.status(202).send({ wishList, message: "SUCCESS" });
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = wishListRouter;
