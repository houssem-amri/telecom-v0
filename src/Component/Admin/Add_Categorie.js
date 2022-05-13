import axios from "axios";
import React, { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import Banner from "../Banner";

export default function Add_Categorie() {
  const [categorie, setCategorie] = useState("");
  const [errMsg, seterrMsg] = useState("");

  let navigate = useNavigate()
  const ChangeCategorie = (event) => {
    setCategorie(event.target.value);
  };

  const HandleSubmit = () => {
    let data = {
      categorie: categorie,
    };
    axios
      .post("http://localhost:3200/api/ajouter_Categorie", data)
      .then((response) => {
        console.log("here response", response.data.message);
        if (response.data.message === "error") {
          seterrMsg(" Categorie est déja ajoutée  ");

        } else {
          navigate("/TableCategorie");

        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Fragment>
      <div className="app-main__inner">
        <Banner title="Ajouter Categorie" icon="fa-cart-arrow-down" />
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
                    />
                                      <span className="text-danger"> {errMsg}</span>

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
