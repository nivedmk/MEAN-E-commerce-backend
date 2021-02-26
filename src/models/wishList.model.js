const mongoose = require("mongoose");
const Item = require("./item.model");
const Schema = mongoose.Schema;

const wishListSchema = new Schema({
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

wishListSchema.methods.getItem = async function (_id) {
  const wishList = this;

  const item = await Item.find({ _id: _id });
  wishList.ItemId = _id;
  wishList.ItemName = item[0].ItemName;
  wishList.ItemPhoto = item[0].ItemPhoto;
  wishList.PhotoByteArray = item[0].PhotoByteArray;
  wishList.Price = item[0].Price;

  return wishList;
};

const WishList = new mongoose.model("wishList", wishListSchema);

module.exports = WishList;
