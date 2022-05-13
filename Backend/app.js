
const express = require("express") // import express
const bodyParser = require("body-parser"); // import body-parser
const mongoose = require("mongoose"); // import mongoose





mongoose.connect('mongodb://localhost:27017/telecomDB', { useNewUrlParser: true, useUnifiedTopology: true });



var FournisseurRouter = require("./Routes/Fournisseur");
var ProductsRouter = require("./Routes/Products");
var UserRouter = require("./Routes/User");
var CategorieRouter = require("./Routes/Categorie");
var CommandeRouter = require("./Routes/Commande");
var MagasinRouter = require("./Routes/Magasin");
var ProjectRouter = require("./Routes/Project");
var TacheRouter = require("./Routes/Taches");

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Security configuration
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Content-Type, X-Requested-with, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS, PATCH, PUT');
	next();
});

app.use("/api", FournisseurRouter);
app.use("/api", ProductsRouter);
app.use("/api", UserRouter);
app.use("/api", CategorieRouter);
app.use("/api", CommandeRouter);
app.use("/api", MagasinRouter);
app.use("/api",ProjectRouter)
app.use("/api",TacheRouter)


module.exports = app