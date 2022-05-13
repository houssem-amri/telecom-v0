const express = require("express");

const router = express.Router();
const Categorie = require("../Models/Categorie");

router.post("/ajouter_Categorie", async (req, res) => {
  const categorie_ar = await Categorie.findOne({ categorie: req.body.categorie });

  if (categorie_ar) {
    res.status(200).json({ message: "error" });
  } else {
    const categorie = new Categorie({
      categorie: req.body.categorie,
    });
    categorie.save();
    res.status(200).json({
      message: "Categorie added succesful",
    });
  }
});

router.put("/Update_Categorie", (req, res) => {
  const categories = {
    _id: req.body._id,
    categorie: req.body._id,
  };
  Categorie.updateOne({ _id: req.body._id }, categories).then(
    res.status(200).json({
      message: "categorie updated successfuly",
    })
  );
});
router.get("/get_Categorie_byId/:id", (req, res) => {
  Categorie.findOne({ _id: req.params.id }).then((findedObject) => {
    if (findedObject) {
      res.status(200).json({
        categorie: findedObject,
      });
    }
  });
});

router.get("/get_Categorie", (req, res) => {
  Categorie.find((err, docs) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({
        categorie: docs,
      });
    }
  });
});

router.delete("/delete_Categorie/:id", (req, res) => {
  console.log("herreeeeeee id ", req.params.id);
  Categorie.deleteOne({ _id: req.params.id }).then(
    res.status(200).json({
      message: "Categorie deleted succesful",
    })
  );
});

module.exports = router;
