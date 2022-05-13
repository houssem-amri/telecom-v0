const express = require("express");

const router = express.Router();
const Commande = require("../Models/Commande");
const Fournisseur = require("../Models/Fournisseur");
const Products = require("../Models/Products");

router.post("/Ajouter_Commande", async (req, res) => {
  const reference_products = await Products.findOne({
    reference: req.body.reference,
    magasin: req.body.magasin,
  });
  if (req.body.typear === "false" && reference_products) {
    res.status(200).json({ message: "error" });
  } else {
    if (req.body.typear === "true") {
      const commande = new Commande({
        id_article: req.body.id_article,

        NewQty: req.body.NewQty,
        Code_article: req.body.Code_article,
        categorie: req.body.categorie,
        lieu_de_stokage: req.body.lieu_de_stokage,
        quantitearticl: req.body.quantitearticl,
        reference: req.body.reference,
        type_article: req.body.type,
        Existance_article: req.body.typear,
        idFournisseur: req.body.idFournisseur,
        datecommande: req.body.datecommande,
        etat: req.body.etat,
        magasin: req.body.magasin,
      });
      commande.save();
      res.status(200).json({
        message: "Commande added succesful",
      });
    }
    if (req.body.typear === "false") {
      const commande = new Commande({
        Code_article: req.body.Code_article,
        categorie: req.body.categorie,
        lieu_de_stokage: req.body.lieu_de_stokage,
        quantitearticl: req.body.quantitearticl,
        reference: req.body.reference,
        type_article: req.body.type,
        Existance_article: req.body.typear,
        idFournisseur: req.body.idFournisseur,
        datecommande: req.body.datecommande,
        etat: req.body.etat,
        magasin: req.body.magasin,
      });
      commande.save();
      res.status(200).json({
        message: "Commande added succesful",
      });
    }
  }
});

router.put("/Update_commande", async (req, res) => {
  if (req.body.Existance_article === "true" && req.body.etat === "accepter") {
    const qtyproducts = await Products.findOne({ _id: req.body.id_article });
    const products = {
      _id: req.body.id_article,
      magasin: req.body.magasin,
      categorie: req.body.categorie,
      lieu_de_stokage: req.body.lieu_de_stokage,
      reference: req.body.reference,
      Code_article: req.body.Code_article,
      type: req.body.type_article,
      quantitearticl:
        Number(qtyproducts.quantitearticl) + Number(req.body.NewQty),
    };
    Products.updateOne({ _id: req.body.id_article }, products).then(() => {
      const commande = {
        _id: req.body._id,
        Code_article: req.body.Code_article,
        categorie: req.body.categorie,
        lieu_de_stokage: req.body.lieu_de_stokage,
        quantitearticl: req.body.quantitearticl,
        reference: req.body.reference,
        type_article: req.body.type_article,
        Existance_article: req.body.Existance_article,
        idFournisseur: req.body.idFournisseur,
        datecommande: req.body.datecommande,
        etat: req.body.etat,
        magasin: req.body.magasin,
        NewQty: req.body.NewQty,
        id_article: req.body.id_article,
      };
      Commande.updateOne({ _id: req.body._id }, commande).then(
        res.status(200).json({
          message: "Commande updated successfuly",
        })
      );
    });
  }
  if (req.body.Existance_article === "false" && req.body.etat === "accepter") {
    const products = new Products({
      magasin: req.body.magasin,
      categorie: req.body.categorie,
      lieu_de_stokage: req.body.lieu_de_stokage,
      reference: req.body.reference,
      Code_article: req.body.Code_article,
      type: req.body.type_article,
      quantitearticl: req.body.quantitearticl,
    });
    products.save();
    const commande = {
      _id: req.body._id,
      Code_article: req.body.Code_article,
      categorie: req.body.categorie,
      lieu_de_stokage: req.body.lieu_de_stokage,
      quantitearticl: req.body.quantitearticl,
      reference: req.body.reference,
      type_article: req.body.type_article,
      Existance_article: req.body.Existance_article,
      idFournisseur: req.body.idFournisseur,
      datecommande: req.body.datecommande,
      etat: req.body.etat,
      magasin: req.body.magasin,
    };
    Commande.updateOne({ _id: req.body._id }, commande).then(
      res.status(200).json({
        message: "Commande updated successfuly",
      })
    );
  }
  if (req.body.Existance_article === "true" && req.body.etat === "anullée") {
    const commande = {
      _id: req.body._id,
      Code_article: req.body.Code_article,
      categorie: req.body.categorie,
      lieu_de_stokage: req.body.lieu_de_stokage,
      quantitearticl: req.body.quantitearticl,
      reference: req.body.reference,
      type_article: req.body.type_article,
      Existance_article: req.body.Existance_article,
      idFournisseur: req.body.idFournisseur,
      datecommande: req.body.datecommande,
      etat: req.body.etat,
      magasin: req.body.magasin,
      NewQty: req.body.NewQty,
      id_article: req.body.id_article,
    };
    Commande.updateOne({ _id: req.body._id }, commande).then(
      res.status(200).json({
        message: "Commande updated successfuly",
      })
    );
  }
  if (req.body.Existance_article === "false" && req.body.etat === "anullée") {
    const commande = {
      _id: req.body._id,
      Code_article: req.body.Code_article,
      categorie: req.body.categorie,
      lieu_de_stokage: req.body.lieu_de_stokage,
      quantitearticl: req.body.quantitearticl,
      reference: req.body.reference,
      type_article: req.body.type_article,
      Existance_article: req.body.Existance_article,
      idFournisseur: req.body.idFournisseur,
      datecommande: req.body.datecommande,
      etat: req.body.etat,
      magasin: req.body.magasin,
    };
    Commande.updateOne({ _id: req.body._id }, commande).then(
      res.status(200).json({
        message: "Commande updated successfuly",
      })
    );
  }
});

router.get("/get_Commande", (req, res) => {
  Commande.find()
    .populate({
      path: "idFournisseur",
    })
    .exec(function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({
          data: docs,
        });
      }
    });
});

router.get("/get_commande_byId/:id", (req, res) => {
  Commande.findOne({ _id: req.params.id })
    .populate({
      path: "idFournisseur",
    })
    .exec(function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        if (docs !== null) {
          res.status(200).json({
            Commande: docs,
          });
        }
      }
    });
});

router.get("/get_commande_etat", (req, res) => {
  Commande.find({ etat: "accepter" }).populate({
    path: "idFournisseur",
  }).populate({
    path: "magasin",
  })
  .exec(function (err, docs) {
    if (err) {
    } else {
      console.log(docs);
      res.status(200).json({
        Commande: docs,
      });
    }
  });
  
  
  // .then((findedObject) => {
  //   if (findedObject) {
  //     res.status(200).json({
  //       Commande: findedObject,
  //     });
  //   }
  // });
});

router.delete("/delete_Commande/:id", (req, res) => {
  console.log("herreeeeeee id ", req.params.id);
  Commande.deleteOne({ _id: req.params.id }).then(
    res.status(200).json({
      message: " Commande deleted succesful",
    })
  );
});

module.exports = router;
