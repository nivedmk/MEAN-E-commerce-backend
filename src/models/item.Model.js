const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
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
  Type: {
    type: String,
    trim: true,
  },
});

const Item = new mongoose.model("item", itemSchema);

module.exports = Item;
