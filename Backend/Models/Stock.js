const mongoose = require("mongoose");

const StockSchema = mongoose.Schema({
  id_produit: { type: String },
  id_user: { type: String },
  id_magasin: { type: String },
});

const Stock = mongoose.model("Stock", StockSchema);
module.exports = Stock;
