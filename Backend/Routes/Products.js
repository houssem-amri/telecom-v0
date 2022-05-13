const express = require("express");


const router = express.Router();

const Products = require("../Models/Products");
router.post("/ajouter_Produits",async (req, res) => {
  const reference_products = await Products.findOne({ reference: req.body.reference,magasin:req.body.magasin });

  if (reference_products) {
    res.status(200).json({ message: "error" });

  } else {
    const products = new Products({
      magasin:req.body.magasin,
      categorie: req.body.categorie,
      lieu_de_stokage: req.body.lieu_de_stokage,
      reference: req.body.reference,
      Code_article: req.body.Code_article,
      type: req.body.type,
      quantitearticl: req.body.quantitearticl
    });
    products.save();
    res.status(200).json({
      message: "Products added succesful",
    });
  }

});
router.put("/Update_Products", (req, res) => {
  const products = {
    _id: req.body._id,
    magasin:req.body.magasin,
    categorie: req.body.categorie,
    lieu_de_stokage: req.body.lieu_de_stokage,
    reference: req.body.reference,
    Code_article: req.body.Code_article,
    type: req.body.type,
    quantitearticl: req.body.quantitearticl
  };
  Products.updateOne({ _id: req.body._id }, products).then(
    res.status(200).json({
      message: "products updated successfuly",
    })
  );
})
router.get("/get_Products", (req, res) => {
  Products.find((err, docs) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({
        data: docs,
      });
    }
  });
});
router.get("/get_Products_byId/:id", (req, res) => {
 Products.findOne({ _id: req.params.id }).then((findedObject) => {
    if (findedObject) {
      res.status(200).json({
      Products: findedObject,
      });
    }
  });
});
router.get("/get_Products_byIdMagasin/:id", (req, res) => {
  Products.find({ magasin: req.params.id }).then((findedObject) => {
    console.log(findedObject );

     if (findedObject) {
       res.status(200).json({
       Products: findedObject,
       });
     }
   });
 });
router.delete("/delete_Products/:id", (req, res) => {
  console.log("herreeeeeee id ", req.params.id);
  Products.deleteOne({ _id: req.params.id }).then(
    res.status(200).json({
      message: "Products deleted succesful",
    })
  );
});


module.exports = router;
