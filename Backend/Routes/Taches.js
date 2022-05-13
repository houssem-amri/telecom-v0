const express = require("express");

const router = express.Router();

let Tache = require("../Models/Taches");

router.post("/ajouter_tache", (req, res) => {
  console.log("heyyyytt req .body", req.body);
  const TOdoListe = new Tache({
    nom_tache: req.body.nom_tache,
    description: req.body.description,
    etat: req.body.etat,
    user: req.body.user,
    id_projet: req.body.id_projet,
    date_debut: req.body.date_debut,
    date_fin: req.body.date_fin,
  });
  TOdoListe.save();
  res.status(200).json({
    message: "Tasck added succesful",
  });
});

router.put("/Update_tache", (req, res) => {
  console.log(req.body);
  const TOdoListe = {
    _id: req.body._id,
    nom_tache: req.body.nom_tache,
    etat: req.body.etat,
    description: req.body.description,
    user: req.body.user,
    id_projet: req.body.id_projet,
    date_debut: req.body.date_debut,
    date_fin: req.body.date_fin,
  };
  Tache.updateOne({ _id: req.body._id }, TOdoListe).then(
    res.status(200).json({
      message: "fournisseur updated successfuly",
    })
  );
});
router.get("/get_tache_byId/:id", (req, res) => {
  Tache.findOne({ _id: req.params.id }).then((findedObject) => {
    res.status(200).json({
      data: findedObject,
    });
  });
});
router.get("/get_tache_byProjet/:id", (req, res) => {
  Tache.find({ id_projet: req.params.id }).then((findedObject) => {
    if (findedObject) {
      res.status(200).json({
        data: findedObject,
      });
    }
  });
});

router.get("/get_tache", (req, res) => {
  Tache.find((err, docs) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({
        data: docs,
      });
    }
  });
});
router.delete("/delete_tache/:id", (req, res) => {
  console.log("herreeeeeee id ", req.params.id);
  Tache.deleteOne({ _id: req.params.id }).then(
    res.status(200).json({
      message: "task deleted succesful",
    })
  );
});

module.exports = router;
