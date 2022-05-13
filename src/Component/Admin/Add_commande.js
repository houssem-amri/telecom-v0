import axios from "axios";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Banner from "../Banner";

export default function Add_commande() {

  const [idFournisseur, setidFournisseur] = useState("");
  const [Fournisseur, setFournisseur] = useState([]);
  const [Products, setProducts] = useState([]);
  const [ProductSelected, setProductSelected] = useState({});
  const [categorie, setCategorie] = useState("");
  const [reference, setReference] = useState("");
  const [lieu_de_stokage, setLieu_de_stokage] = useState("");
  const [Code_article, setCode] = useState("");
  const [type, settype] = useState("");
  const [quantitearticl, setquantitearticl] = useState("");
  const [errMsg, seterrMsg] = useState("");
  const [typear, setTypear] = useState("");
  const [NewQty, setNewQty] = useState("");

  const connectedUser = JSON.parse(
    localStorage.getItem("redux_localstorage_simple") || "[]"
  );
  const [categories, setCategories] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    getAllCategorie();
    getAllFournisseur();
    getAllProducts();
  }, []);

  const getAllFournisseur = () => {
    axios
      .get("http://localhost:3200/api/get_fournisseur")
      .then((response) => {
        setFournisseur(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getAllProducts = () => {
    axios
      .get(
        "http://localhost:3200/api/get_Products_byIdMagasin/" +
          connectedUser?.userData?.magasin
      )
      .then((result) => {
        setProducts(result.data.Products);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const ChangeCategorie = (event) => {
    setCategorie(event.target.value);
  };

  const ChangeCode = (event) => {
    setCode(event.target.value);
  };
  const Changetype_articl = (event) => {
    settype(event.target.value);
  };
  const ChangeReference = (event) => {
    setReference(event.target.value);
  };
  const ChangeLieu_de_stokage = (event) => {
    setLieu_de_stokage(event.target.value);
  };
  const Changequantitearticl = (event) => {
    setquantitearticl(event.target.value);
  };


  const ChangeidFournisseur = (event) => {
    setidFournisseur(event.target.value);
  };

 

  const HandleSubmit = () => {
    let data = {};
    if (typear === "false") {
      data = {
        typear: typear,
        categorie: categorie,
        lieu_de_stokage: lieu_de_stokage,
        reference: reference,
        Code_article: Code_article,
        quantitearticl: quantitearticl,
        type: type,
        idFournisseur: idFournisseur,
        datecommande: Date.now(),
        etat: "attente",
        magasin: connectedUser.userData.magasin,
      };
    }
    if (typear === "true") {
      let products = JSON.parse(ProductSelected);

      data = {
        typear: typear,
        NewQty:NewQty,
        id_article:products._id,
        categorie: products.categorie,
        lieu_de_stokage: products.lieu_de_stokage,
        reference: products.reference,
        Code_article: products.Code_article,
        quantitearticl: products.quantitearticl,
        type: products.type,
        idFournisseur: idFournisseur,
        datecommande: Date.now(),
        etat: "attente",
        magasin: connectedUser.userData.magasin,
      };
    }
    axios
      .post("http://localhost:3200/api/Ajouter_Commande", data)
      .then((response) => {
        console.log("here response", response.data.message);
        if (response.data.message === "error") {
          seterrMsg(" Cette Reference est déja ajoutée");
        } else {
          navigate("/TableCommande");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAllCategorie = () => {
    axios
      .get("http://localhost:3200/api/get_Categorie")
      .then((result) => {
        setCategories(result.data.categorie);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Fragment>
      <div className="app-main__inner">
        <Banner title="Ajouter Commande" icon="pe-7s-add-user" />
        <div className="main-card mb-3 card">
          <div className="card-body">
            <h1 className="card-title">Remplir le formulaire</h1>
            <form>
              <div className="form-row">
                <div className="col-md-12">
                  <div className="position-relative form-group">
                    <label htmlFor="examplePassword11">Existance d'article</label>
                    <select
                      name="categorie"
                      className="form-control"
                      onChange={(event) => setTypear(event.target.value)}
                    >
                      <option value="">Sélectionner Type d'article </option>
                      <option value={false}>Nouveau article </option>
                      <option value={true}>Ancien article </option>
                    </select>
                  </div>
                </div>
                {typear === "false" ? (
                  <Fragment>
                    <div className="col-md-6">
                      <div className="position-relative form-group">
                        <label htmlFor="examplePassword11">
                          Categorie Article
                        </label>
                        <select
                          name="categorie"
                          className="form-control"
                          onChange={(event) => ChangeCategorie(event)}
                        >
                          <option value="">Sélectionner Categorie </option>
                          {categories?.map((value, i) => (
                            <option key={i} value={value.categorie}>
                              {value.categorie}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="position-relative form-group">
                        <label htmlFor="examplCode">Code Article</label>
                        <input
                          name="Code"
                          id="examplecode_article"
                          placeholder="Id"
                          type="text"
                          className="form-control"
                          onChange={(event) => ChangeCode(event)}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="position-relative form-group">
                        <label htmlFor="exampletype"> Type</label>
                        <input
                          name="type_article"
                          id="exampletype_article"
                          placeholder="Type"
                          type="text"
                          className="form-control"
                          onChange={(event) => Changetype_articl(event)}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="position-relative form-group">
                        <label htmlFor="exampleRefERENCE">Reference</label>
                        <input
                          name="Reference"
                          id="exampleReference"
                          placeholder="REF"
                          type="text"
                          className="form-control"
                          onChange={(event) => ChangeReference(event)}
                        />
                        <span className="text-danger"> {errMsg}</span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="position-relative form-group">
                        <label htmlFor="exampleQuantitearticle">
                          {" "}
                          Quantite articl"
                        </label>
                        <input
                          name=" quantitearticl"
                          id="examplequantitearticl"
                          placeholder="QTE"
                          type="text"
                          className="form-control"
                          onChange={(event) => Changequantitearticl(event)}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="position-relative form-group">
                        <label htmlFor="exampleLieu_stokage">
                          Lieu Stokage"
                        </label>
                        <input
                          name="Lieu_stokage"
                          id="exampleLieu_stokage"
                          placeholder="Lieu_stokage"
                          type="text"
                          className="form-control"
                          onChange={(event) => ChangeLieu_de_stokage(event)}
                        />
                      </div>
                    </div>
                  </Fragment>
                ) : typear === "true" ? (
                  <Fragment>
                    <div className="col-md-6">
                      <div className="position-relative form-group">
                        <label htmlFor="exampleidFournisseur">
                          Sélectionner Poduit{" "}
                        </label>
                        <select
                          name="categorie"
                          className="form-control"
                          onChange={(event) =>
                            setProductSelected(event.target.value)
                          }
                        >
                          <option value="">Sélectionner Poduit </option>
                          {Products?.map((value, i) => (
                            <option key={i} value={JSON.stringify(value)}>
                              {value.Code_article}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="position-relative form-group">
                        <label htmlFor="exampleLieu_stokage">
                          Quantite
                        </label>
                        <input
                          name="Lieu_stokage"
                          id="exampleLieu_stokage"
                          placeholder="Quantite"
                          type="number"
                          className="form-control"
                          onChange={(event) => setNewQty(event.target.value)}
                        />
                      </div>
                    </div>
                  </Fragment>
                ) : null}

                <div className="col-md-12">
                  <div className="position-relative form-group">
                    <label htmlFor="exampleidFournisseur">
                      Nom fournisseur
                    </label>
                    <select
                      name="categorie"
                      className="form-control"
                      onChange={(event) => ChangeidFournisseur(event)}
                    >
                      <option value="">Sélectionner fournisseur </option>
                      {Fournisseur?.map((value, i) => (
                        <option key={i} value={value._id}>
                          {value.nom} {value.prenom}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="col-md-12">
                  <button
                    type="button"
                    className="mt-2 btn btn-primary"
                    onClick={HandleSubmit}
                  >
                    Envoyer
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
