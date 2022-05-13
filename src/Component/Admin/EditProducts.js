import React, { Fragment, useContext, useEffect, useState } from "react";
import Banner from "../Banner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../../User_contex";

export default function EditProducts() {
  const { CurrentUser, setCurrentUser } = useContext(UserContext);

  const [categorie, setCategorie] = useState("");
  const [reference, setReference] = useState("");
  const [lieu_de_stokage, setLieu_de_stokage] = useState("");
  const [Code_article, setCode_article] = useState("");
  const [type, settype] = useState("");
  const [ quantitearticl,setquantitearticl]= useState("");
  const [categories, setCategories] = useState([]);
  let param = useParams();
  let navigate = useNavigate()

  useEffect(() => {
    getProductsById();
    getAllCategorie();
  }, []);

  const getProductsById = () => {
    axios
      .get("http://localhost:3200/api/get_Products_byId/" + param.id)

      .then((result) => {
        let data = result.data.Products;
        setCategorie(data.categorie_article);
        setLieu_de_stokage(data.lieu_de_stokage);
        setReference(data.reference);
        setCode_article(data.Code_article);
        settype(data.type);
        setquantitearticl(data.quantitearticl)
        console.log("f", result)
      })

      .catch((err) => {
        console.log(err);
      });
  };



  const ChangeCategorie = (event) => {
    setCategorie(event.target.value);
  };

  const ChangeCode = (event) => {
    setCode_article(event.target.value)
  };
  const Changetype_articl = (event) => {
    settype(event.target.value)
  };
  const ChangeReference = (event) => {
    setReference(event.target.value);
  };
  const ChangeLieu_stokage = (event) => {
    setLieu_de_stokage(event.target.value);
  };
  const Changequantitearticl = (event) => {
    setquantitearticl(event.target.value);
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
  }


  const HandleSubmit = () => {
    let data = {
      _id: param.id,
      magasin: CurrentUser.magasin,
      categorie: categorie,
      lieu_de_stokage: lieu_de_stokage,
      reference: reference,
      Code_article: Code_article,
      type: type,
      quantitearticl:quantitearticl,

    }
    axios
      .put("http://localhost:3200/api/Update_Products", data)
      .then((response) => {
        console.log("here response", response.data.message);
        navigate("/TableProducts")
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
                      value={categorie} >

                      <option value="">Sélectionner categorie </option>
                      {categories?.map((value, i) => (
                        <option
                          key={i} value={value.categorie}>{value.categorie}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="examplCode">Code Article</label>
                    <input
                      name="Code"
                      id="exampleCode"
                      placeholder="Id"
                      type="text"
                      className="form-control"
                      onChange={(event) => ChangeCode(event)}
                      value={Code_article || ""}
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
                      value={type || ""}
                    /></div>
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
                      value={reference || ""}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="exampleQuantitearticle"> Quantite articl"</label>
                    <input
                      name=" quantitearticl"
                      id="examplequantitearticl"
                      placeholder="QTE"
                      type="text"
                      className="form-control"
                      onChange={(event) => Changequantitearticl(event)}
                      value={quantitearticl || ""} />
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
                      onChange={(event) => ChangeLieu_stokage(event)}
                      value={lieu_de_stokage || ""}
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