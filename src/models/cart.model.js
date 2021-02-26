const mongoose = require("mongoose");
const Item = require("./item.model");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  ItemId: {
    type: mongoose.Types.ObjectId,
  },
  ItemName: {
    type: String,
    trim: true,
  },
  ItemPhoto: {
    data: Buffer,
    type: String,
  },
  PhotoByteArray: {
    data: Buffer,
    type: String,
  },
  Price: {
    type: Number,
    trim: true,
  },
  Qty: {
    type: Number,
    trim: true,
    default: 1,
  },
  owner: {
    type: mongoose.Types.ObjectId,
  },
});

cartSchema.methods.getItem = async function (_id) {
  const cart = this;

  const item = await Item.find({ _id: _id });
  cart.ItemId = _id;
  cart.ItemName = item[0].ItemName;
  cart.ItemPhoto = item[0].ItemPhoto;
  cart.PhotoByteArray = item[0].PhotoByteArray;
  cart.Price = item[0].Price;

  return cart;
};

const Cart = new mongoose.model("cart", cartSchema);

module.exports = Cart;
