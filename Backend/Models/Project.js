const mongoose = require("mongoose");

const ProjectSchema = mongoose.Schema(
  {
    TypeSortie: { type: String },
    idProduit: { type: String, ref: "Products" },
    NomProjet: { type: String },
    lieuProjet: { type: String },
    chefProjet: { type: String },
    DateDebut: { type: Date },
    quantitearticl: { type: String },
    etat: { type: String },
    magasin: { type: String, ref: "Magasin" },
    user: { type: String, ref: "User" },
  },
  { strict: false }
);

const Project = mongoose.model("project", ProjectSchema);
module.exports = Project;
