const mongoose = require("mongoose");
   
const CategorieSchema=mongoose.Schema({
     
     categorie:{type : String},
     
    });

    const Categorie = mongoose.model("Categorie",CategorieSchema);
  module.exports =Categorie;