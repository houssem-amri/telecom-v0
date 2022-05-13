import axios from "axios";
import React, { useState, Fragment, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../User_contex";
import Banner from "../Banner";

export default function Add_products() {

  const [categorie, setCategorie] = useState("");
  const [reference, setReference] = useState("");
  const [lieu_de_stokage, setLieu_de_stokage] = useState("");
  const [Code_article, setCode] = useState("");
  const [type, settype] = useState("");
  const [quantitearticl, setquantitearticl] = useState("");
  const [errMsg, seterrMsg] = useState("");
  const connectedUser = JSON.parse(
    localStorage.getItem("redux_localstorage_simple") || "[]"
  );
  const [categories, setCategories] = useState([]);
  let navigate = useNavigate();

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
  useEffect(() => {
    getAllCategorie();
  }, []);

  const HandleSubmit = () => {
    let data = {
      magasin: connectedUser.userData.magasin,
      categorie: categorie,
      lieu_de_stokage: lieu_de_stokage,
      reference: reference,
      Code_article: Code_article,
      quantitearticl: quantitearticl,
      type: type,
    };

    axios
      .post("http://localhost:3200/api/ajouter_Produits", data)
      .then((response) => {
        console.log("here response", response.data.message);
        if (response.data.message === "error") {
          seterrMsg(" Cette Reference est déja ajoutée");
        } else {
          navigate("/TableProducts");
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
        <Banner title="Ajouter Produit" icon="fa-cart-arrow-down" />
        <div className="main-card mb-3 card">
          <div className="card-body">
            <h1 className="card-title">Remplir le formulaire</h1>
            <form>
              <div className="form-row">
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="examplePassword11">Categorie Article</label>
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
                    <label htmlFor="exampleLieu_stokage">Lieu Stokage"</label>
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
              </div>
              <button
                type="button"
                onClick={HandleSubmit}
                className="mt-2 btn btn-primary"
              >
                Ajouter
              </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
