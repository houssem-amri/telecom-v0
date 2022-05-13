const express = require("express");

const router = express.Router();

const Project = require("../Models/Project");
const Products = require("../Models/Products");

router.post("/ajouter_project", (req, res) => {
  if (
    req.body.TypeSortie === "extension" ||
    req.body.TypeSortie === "entretien"
  ) {
    console.log("extension", req.body);

    const project = new Project({
      TypeSortie: req.body.TypeSortie,
      idProduit: req.body.idProduit,
      DateDebut: req.body.DateDebut,
      quantitearticl: req.body.quantitearticl,
      etat: req.body.etat,
      user: req.body.user,
      magasin: req.body.magasin,
    });
    project.save();
    res.status(200).json({
      message: "Project added succesful",
    });
  }
  if (req.body.TypeSortie === "projet") {
    console.log("projet", req.body);

    const project = new Project({
      TypeSortie: req.body.TypeSortie,
      NomProjet: req.body.NomProjet,
      lieuProjet: req.body.lieuProjet,
      chefProjet: req.body.chefProjet,
      idProduit: req.body.idProduit,
      DateDebut: req.body.DateDebut,
      quantitearticl: req.body.quantitearticl,
      etat: req.body.etat,
      user: req.body.user,
      magasin: req.body.magasin,
    });
    project.save();
    res.status(200).json({
      message: "Project added succesful",
    });
  }
});
router.get("/get_project", (req, res) => {
  Project.find((err, docs) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({
        data: docs,
      });
    }
  });
});
router.put("/Update_Project", (req, res) => {
  const project = {
    _id: req.body._id,

    NomProjet: req.body.NomProjet,
    lieuProjet: req.body.lieuProjet,
    chefProjet: req.body.chefProjet,
    DateDebut: req.body.DateDebut,
    quantitearticl: req.body.quantitearticl,
    etat: req.body.etat,
  };
  Project.updateOne({ _id: req.body._id }, project).then(
    res.status(200).json({
      message: "Project updated successfuly",
    })
  );
});
router.get("/get_Project_byId/:id", (req, res) => {
  Project.findOne({ _id: req.params.id }).then((findedObject) => {
    if (findedObject) {
      res.status(200).json({
        project: findedObject,
      });
    }
  });
});
router.delete("/delete_Project/:id", (req, res) => {
  console.log("herreeeeeee id ", req.params.id);
  Project.deleteOne({ _id: req.params.id }).then(
    res.status(200).json({
      message: "Project deleted succesful",
    })
  );
});

router.get("/get_Project_attent/:id", (req, res) => {
  Project.find({ etat: "attent", magasin: req.params.id })
    .populate({
      path: "idProduit",
    })
    .then((findedObject) => {
      if (findedObject) {
        res.status(200).json({
          project: findedObject,
        });
      }
    });
});
router.get("/get_Project_accept/:id", (req, res) => {
  Project.findOne({ etat: "accepter", magasin: req.params.id }).then(
    (findedObject) => {
      if (findedObject) {
        res.status(200).json({
          project: findedObject,
        });
      }
    }
  );
});
router.get("/get_sortie/:id", (req, res) => {
  let T = ["extension", "entretien"];
  Project.find({
    TypeSortie: { $in: T },

    magasin: req.params.id,
  })

    .populate({
      path: "idProduit",
    })
    .populate({
      path: "magasin",
    })
    .then((findedObject) => {
      if (findedObject) {
        res.status(200).json({
          data: findedObject,
        });
      }
    });
});
router.get("/get_projet_all/:id", (req, res) => {
  let T = ["projet"];
  Project.find({
    TypeSortie: { $in: T },

    magasin: req.params.id,
  })

    .populate({
      path: "idProduit",
    })
    .populate({
      path: "magasin",
    })
    .then((findedObject) => {
      if (findedObject) {
        res.status(200).json({
          data: findedObject,
        });
      }
    });
});
router.put("/edit_project", (req, res) => {
  let project = {};
  const products = {
    _id: req.body.idProduit._id,
    magasin: req.body.idProduit.magasin,
    categorie: req.body.idProduit.categorie,
    lieu_de_stokage: req.body.idProduit.lieu_de_stokage,
    reference: req.body.idProduit.reference,
    Code_article: req.body.idProduit.Code_article,
    type: req.body.idProduit.type,
    quantitearticl:
      Number(req.body.idProduit.quantitearticl) -
      Number(req.body.quantitearticl),
  };
  Products.updateOne({ _id: req.body.idProduit._id }, products).then(() => {
    if (
      req.body.TypeSortie === "extension" ||
      req.body.TypeSortie === "entretien"
    ) {
      project = {
        _id: req.body._id,
        TypeSortie: req.body.TypeSortie,
        idProduit: req.body.idProduit._id,
        DateDebut: req.body.DateDebut,
        quantitearticl: req.body.quantitearticl,
        etat: "accepter",
        user: req.body.user,
        magasin: req.body.magasin,
      };
    } else {
      project = {
        _id: req.body._id,
        TypeSortie: req.body.TypeSortie,
        NomProjet: req.body.NomProjet,
        lieuProjet: req.body.lieuProjet,
        chefProjet: req.body.chefProjet,
        idProduit: req.body.idProduit._id,
        DateDebut: req.body.DateDebut,
        quantitearticl: req.body.quantitearticl,
        etat: "accepter",
        user: req.body.user,
        magasin: req.body.magasin,
      };
    }

    Project.updateOne({ _id: req.body._id }, project).then(
      res.status(200).json({
        message: "Project updated successfuly",
      })
    );
  });
});
module.exports = router;
