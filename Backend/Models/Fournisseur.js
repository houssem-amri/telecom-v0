const mongoose = require("mongoose");

const FournisseurSchema = mongoose.Schema({
  nom: { type: String },
  prenom: { type: String },
  email: { type: String ,unique: true},
  poste_occupe: { type: String },
  site_web: { type: String },
  tel: { type: Number },
  adress: { type: String },
  ville: { type: String },
  state: { type: String },
  code_postal: { type: String },

});

const Fournisseur = mongoose.model("Fournisseur", FournisseurSchema);

module.exports = Fournisseur;
