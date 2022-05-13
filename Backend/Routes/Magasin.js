const express = require("express");

const router = express.Router();
const Magasin = require("../Models/Magasin");

router.post("/ajouter_magasin", (req, res) => {
  const magasin = new Magasin({
    nomMagasin: req.body.nomMagasin,
    adress: req.body.adress,
    ville: req.body.ville,
    email: req.body.email,
    fixe: req.body.fixe,
    type: req.body.type,
  });
  magasin.save();
  res.status(200).json({
    message: "Magasin added succesful",
  });
});
router.put("/Update_Magasin", (req, res) => {
  console.log("heyyyytt req .body", req.body);

  const magasin = {
    _id: req.body._id,
    nomMagasin: req.body.nomMagasin,
    adress: req.body.adress,
    ville: req.body.ville,
    email: req.body.email,
    fixe: req.body.fixe,
    type: req.body.type,
  };
  Magasin.updateOne({ _id: req.body._id }, magasin).then(
    res.status(200).json({
      message: "Magasin updated successfuly",
    })
  );
});
router.get("/get_Mgasain", (req, res) => {
  Magasin.find((err, docs) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({
        Magasin: docs,
      });
    }
  });
});

router.delete("/delete_Magasin/:id", (req, res) => {
  Magasin.deleteOne({ _id: req.params.id }).then(
    res.status(200).json({
      message: "Magasin deleted succesful",
    })
  );
});

router.get("/get_Magasin_byId/:id", (req, res) => {
  Magasin.findOne({ _id: req.params.id }).then((findedObject) => {
    if (findedObject) {
      res.status(200).json({
        Magasin: findedObject,
      });
    }
  });
});

module.exports = router;
