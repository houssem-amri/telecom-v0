const mongoose = require("mongoose");

const CommandeSchema = mongoose.Schema({
  id_article: { type: String },
  Code_article: { type: String },
  categorie: { type: String },
  lieu_de_stokage: { type: String },
  quantitearticl: { type: String },
  reference: { type: String },
  type_article: { type: String },
  Existance_article: { type: String },
  idFournisseur: { type: mongoose.Schema.Types.ObjectId, ref: "Fournisseur" },
  datecommande: { type: Date },
  etat: { type: String },
  magasin: { type: String ,ref: "Magasin" },
},{strict:false});

const Commande = mongoose.model("Commande", CommandeSchema);
module.exports = Commande;
