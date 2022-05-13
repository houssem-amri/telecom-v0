import { useNavigate, useParams } from "react-router-dom";
import React, { useState, Fragment, useEffect } from "react";
import Banner from "../Banner";
import axios from "axios";

export default function EditCategorie() {
    const [categorie, setCategorie] = useState("");
    let param = useParams();
    let navigate=useNavigate()

    const ChangeCategorie = (event) => {
      setCategorie(event.target.value);
    };
    useEffect(() => {
        getCategorieById();
      }, []);
      const getCategorieById = () => {
        axios
          .get("http://localhost:3200/api/get_Categorie_byId/" + param.id)
          .then((result) => {
            let data = result.data.categorie;
            setCategorie(data.Categorie);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const HandleSubmit = () => {
      let data = {
        _id: param.id,
        categorie: categorie,
      };
      axios
      .put("http://localhost:3200/api/Update_Categorie", data)
      .then((response) => {
        console.log("here response", response.data.message);
        navigate("/TableCategorie");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  return (
    <Fragment>
    <div className="app-main__inner">
      <Banner title="Modifier Categorie" icon="fa-cart-arrow-down" />
      <div className="main-card mb-3 card">
        <div className="card-body">
          <h1 className="card-title">Remplir le formulaire</h1>
          <form>
            <div className="form-row">
              <div className="col-md-6">
                <div className="position-relative form-group">
                  <label htmlFor="exampleCategorie">Categorie article</label>
                  <input
                    name="Categorie"
                    id="exampleCategorie"
                    placeholder="Categorie "
                    type="text"
                    className="form-control"
                    onChange={(event) => ChangeCategorie(event)}
                    value={categorie || ""}
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
