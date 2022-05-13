const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  NomUtilisateur: { type: String, required: true, trim: true },
  PrenomUtilisateur: { type: String },
  Email: { type: String, unique: true, required: true, trim: true },
  Poste: { type: String, required: true, trim: true },
  Tel: { type: String },
  password: { type: String, required: true, trim: true },
  magasin: { type: mongoose.Types.ObjectId, ref: "Magasin" },
},{strict:false});


const User = mongoose.model("User", UserSchema);
module.exports = User;
