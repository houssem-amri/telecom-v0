const mongoose = require("mongoose");

const TacheSchema = mongoose.Schema({
  nom_tache: { type: String },
  description: { type: String },
  etat: { type: String },
  user: { type: String },
  id_projet: { type: String , ref:"project" },
  date_debut: { type: Date },
  date_fin: { type: Date },
});

const tache = mongoose.model("Tache", TacheSchema);

module.exports = tache;
