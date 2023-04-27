const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  nameProd: String,
  category: String,
  image: String,
  description: String,
});

module.exports = mongoose.model("product", productSchema);
