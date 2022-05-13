const mongoose = require("mongoose");

const ProductsSchema = mongoose.Schema({
  magasin: { type: String },
  categorie: { type: String },
  lieu_de_stokage: { type: String },
  reference: { type: String ,unique:true},
  Code_article: { type: String },
  type: { type: String },
  quantitearticl: { type: String },
});

const Products = mongoose.model("Products", ProductsSchema);
module.exports = Products;
