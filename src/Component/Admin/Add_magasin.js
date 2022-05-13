import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Banner from "../Banner";
import { useNavigate } from "react-router-dom";

export default function Add_magasin() {
  const [nomMagasin, setNomMagasin] = useState("");
  const [adress, setAdress] = useState("");
  const [ville, setVille] = useState("");
  const [email, setEmail] = useState("");  
  const [fixe, setFixe] = useState("");  
  useEffect(()=>{

  },[])
  let navigate=useNavigate()
  const ChangeNom = (event) => {
    setNomMagasin(event.target.value);
  };
  const ChangeAdress = (event) => {
    setAdress(event.target.value);
  };
  const ChangeVille = (event) => {
    setVille(event.target.value);
  };
  const ChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const Changefixe = (event) => {
    setFixe(event.target.value);
  };

  const HandleSubmit = () => {
    let data = {
      nomMagasin:nomMagasin,
      adress:adress,
      ville:ville,
      email:email,
      fixe:fixe,
      type:"sous_magasin"
    };
    console.log("here response", data);
    axios
      .post("http://localhost:3200/api/ajouter_magasin", data)
      .then((response) => {
        console.log("here response", response.data.message);
        navigate("/TableMagasin");
      })
      .catch((error) => {
        console.log(error);
      });
   
    }
  return (
  
      <Fragment>
        <div className="app-main__inner">
      
          <Banner title="Ajouter Magasin" icon="pe-7s-add-user"/>
          <div className="main-card mb-3 card">
            <div className="card-body">
              <h1 className="card-title">Remplir le formulaire</h1>
              <form>
                <div className="form-row">
                  <div className="col-md-6">
                    <div className="position-relative form-group">
                      <label htmlFor="exampleEmail11">Nom Magasin</label>
                      <input
                        name="nom"
                        id="exampleNom"
                        placeholder="Nom"
                        type="text"
                        className="form-control"
                        onChange={(event) => ChangeNom(event)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="position-relative form-group">
                      <label htmlFor="examplePassword11">Adress</label>
                      <input
                        name="Prénom"
                        id="examplePassword11"
                        placeholder="Adress"
                        type="text"
                        className="form-control"
                        onChange={(event) => ChangeAdress(event)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="position-relative form-group">
                      <label htmlFor="exampleEmail">ville</label>
                      <input
                        name="email"
                        id="exampleEmail11"
                        placeholder="Ville"
                        type="email"
                        className="form-control"
                        onChange={(event) => ChangeVille(event)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="position-relative form-group">
                      <label htmlFor="examplePoste_occupé">Email</label>
                      <input
                        name="Email"
                        id="exampleEmail"
                        placeholder="Email"
                        type="text"
                        className="form-control"
                        onChange={(event) => ChangeEmail(event)}
                      />
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="position-relative form-group">
                      <label htmlFor="exampleTel">FIXE</label>
                      <input
                        name="tele"
                        id="exampleTel"
                        placeholder="tel"
                        type="number"
                        className="form-control"
                        onChange={(event) => Changefixe(event)}
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
  