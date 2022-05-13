const mongoose = require("mongoose");
   
const MagasinSchema=mongoose.Schema({

   
    nomMagasin: {type : String},
    adress: {type : String},
    ville: {type : String}, 
    email:{type : String}, 
    fixe:{type : String}, 
    type:{type : String}, 
    });

    const Magasin = mongoose.model("Magasin",MagasinSchema);
  module.exports =Magasin;