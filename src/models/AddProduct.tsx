const mongoose = require('mongoose');

const AddProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  localID: {
    type: Number,
  },
  isInStock: {
    type: Boolean,
  },
  Barcode: {
    type: Number,
    unique: true
  },
  picture: {
    type: String,
  },
  isLimitedOffer: {
    type: Boolean,
  },
  category: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  collection: "Products"
})

module.exports = mongoose.model("AddProduct", AddProductSchema)