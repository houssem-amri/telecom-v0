const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const Magasin = require("../Models/Magasin");

const bcrypt = require("bcrypt");

router.post("/ajouter_Utilisateur", async (req, res) => {

  const user_email = await User.findOne({ Email: req.body.Email });
  if (user_email) {
    res.status(200).json({ message: "error" });
  }else{
    bcrypt.hash(req.body.password, 10).then((hash) => {
      const user = new User({
        NomUtilisateur: req.body.NomUtilisateur,
        PrenomUtilisateur: req.body.PrenomUtilisateur,
        Email: req.body.Email,
        Poste: req.body.Poste,
        Tel: req.body.Tel,
        password: hash,
        magasin: req.body.magasin,
      });
      user.save()
      res.status(200).json({
        message: "user added succesful",
      })
    });
  }
 
});

router.post("/add_super_admin", (req, res) => {
  User.findOne({ Poste: "super_admin" }).then((findedObject) => {
    if (findedObject) {
      res.status(200).json({
        message: "0",
      });
    } else {
      const magasin = new Magasin({
        nomMagasin: req.body.nomMagasin,
        adress: req.body.adress,
        ville: req.body.ville,
        email: req.body.email,
        fixe: req.body.fixe,
        type: req.body.type,
      });
      magasin.save();
      Magasin.findOne({ type: "principal" }).then((findedMagsin) => {
        if (findedMagsin) {
          res.status(200).json({
            message: "2",
          });
        }
        else{
          Magasin.findOne({ type: "principal" }).then((final)=>{
            if (final) {
              bcrypt.hash(req.body.password, 10).then((hash) => {
                const user = new User({
                  NomUtilisateur: req.body.NomUtilisateur,
                  PrenomUtilisateur: req.body.PrenomUtilisateur,
                  Email: req.body.Email,
                  Poste: req.body.Poste,
                  magasin: final._id,
                  password: hash,
                });
                user.save();
                res.status(200).json({
                  message: "1",
                });
              });
            }
          })
         
        }
      });
    }
  });
});

router.put("/Update_Utilisateur", (req, res) => {
  const user = {
    _id: req.body._id,
    NomUtilisateur: req.body.NomUtilisateur,
    PrenomUtilisateur: req.body.PrenomUtilisateur,
    Email: req.body.Email,
    Poste: req.body.Poste,
    Tel: req.body.Tel,
    password: req.body.password,
    magasin: req.body.magasin,
  };
  User.updateOne({ _id: req.body._id }, user).then(
    res.status(200).json({
      message: "user updated successfuly",
    })
  );
});

router.get("/get_user", (req, res) => {
  User.find((err, docs) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({
        data: docs,
      });
    }
  });
});

router.get("/get_user_byId/:id", (req, res) => {
  User.findOne({ _id: req.params.id }).then((findedObject) => {
    if (findedObject) {
      res.status(200).json({
        user: findedObject,
      });
    }
  });
});

router.delete("/delete_User/:id", (req, res) => {
  User.deleteOne({ _id: req.params.id }).then(
    res.status(200).json({
      message: "user deleted succesful",
    })
  );
});
router.post("/login", (req, res) => {
  User.findOne({ Email: req.body.email })
    .then((findedUser) => {
      if (!findedUser) {
        res.status(200).json({
          message: "0",
        });
      }
      return bcrypt.compare(req.body.password, findedUser.password);
    })
    .then((correctUserPwd) => {
      if (!correctUserPwd) {
        res.status(200).json({
          message: "1",
        });
      }
      User.findOne({ Email: req.body.email }).then((finalUser) => {
        let user = {
          id: finalUser._id,
          NomUtilisateur: finalUser.NomUtilisateur,
          PrenomUtilisateur: finalUser.PrenomUtilisateur,
          Poste: finalUser.Poste,
          magasin: finalUser.magasin,
        };
        res.status(200).json({
          user: user,
          message: "2",
        });
      });
    });
});

module.exports = router;
