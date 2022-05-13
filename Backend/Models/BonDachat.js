const mongoose = require("mongoose");
   
const BonDachatSchema=mongoose.Schema({
     
    commande:{},
     
    });

    const BonDachat = mongoose.model("bonDachat",BonDachatSchema);
  module.exports =BonDachat;