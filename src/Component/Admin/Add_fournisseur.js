import React, { Fragment, useState } from "react";
import axios from "axios";
import Banner from "../Banner";
import { useNavigate } from "react-router-dom";

export default function Add_fournisseur() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState();
  const [adress, setAdress] = useState("");
  const [ville, setVille] = useState("");
  const [state, setState] = useState("");
  const [code_postal, setcode_postal] = useState("");
  const [poste_occupe, setPoste_occupé] = useState("");
  const [Site_Web, setSite_Web] = useState("");
  const [errMsg, seterrMsg] = useState("");

  let navigate=useNavigate()

  const ChangeNom = (event) => {
    setNom(event.target.value);
  };
  const ChangePrenom = (event) => {
    setPrenom(event.target.value);
  };
  const ChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const ChangePoste_occupé = (event) => {
    setPoste_occupé(event.target.value);
  };

  const ChangeSite_Web = (event) => {
    setSite_Web(event.target.value);
  };
  const ChangeTel = (event) => {
    setTel(event.target.value);
  };
  const ChangeAdress = (event) => {
    setAdress(event.target.value);
  };
  const ChangeVille = (event) => {
    setVille(event.target.value);
  };
  const ChangeState = (event) => {
    setState(event.target.value);
  };
  const ChangeCode_postal = (event) => {
    setcode_postal(event.target.value);
  };

  const HandleSubmit = () => {
    let data = {
      nom: nom,
      prenom: prenom,
      email: email,
      poste_occupe: poste_occupe,
      site_web: Site_Web,
      tel: tel,
      adress: adress,
      ville: ville,
      state: state,
     code_postal:code_postal,
    };
    console.log("here response", data);
   
    axios
      .post("http://localhost:3200/api/ajouter_fournisseur", data)
      .then((response) => {
        console.log("here response", response.data.message);
        if (response.data.message === "error") {
          seterrMsg(" Cette Email est déja ajoutée  ");

        } else {
          navigate("/Tablefournisseur");

        }
      })
      .catch((error) => {
        console.log(error);
      });
   
    }
  return (
    <Fragment>
      <div className="app-main__inner">
        {/* <div className="app-page-title">
          <div className="page-title-wrapper">
            <div className="page-title-heading">
              <div className="page-title-icon">
                <i className="pe-7s-add-user"> </i>
              </div>
              <div>Ajouter Fournisseur</div>
            </div>
          </div>
        </div> */}
        <Banner title="Ajouter Fournisseur" icon="pe-7s-add-user"/>
        <div className="main-card mb-3 card">
          <div className="card-body">
            <h1 className="card-title">Remplir le formulaire</h1>
            <form>
              <div className="form-row">
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="exampleEmail11">Nom</label>
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
                    <label htmlFor="examplePassword11">Prénom</label>
                    <input
                      name="Prénom"
                      id="examplePassword11"
                      placeholder="Prénom"
                      type="text"
                      className="form-control"
                      onChange={(event) => ChangePrenom(event)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="exampleEmail">Email</label>
                    <input
                      name="email"
                      id="exampleEmail11"
                      placeholder="E-mail"
                      type="email"
                      className="form-control"
                      onChange={(event) => ChangeEmail(event)}
                    />
                   <span className="text-danger">{errMsg}</span> 
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="examplePoste_occupé">Poste Occupé</label>
                    <input
                      name="Poste_occupé"
                      id="examplePoste_occupé"
                      placeholder="Poste Occupé"
                      type="text"
                      className="form-control"
                      onChange={(event) => ChangePoste_occupé(event)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="exampleSite_Web">Site Web</label>
                    <input
                      name="Site_Web"
                      id="exampleSite_Web"
                      placeholder="'http:/Sitewep.com'"
                      type="text"
                      className="form-control"
                      onChange={(event) => ChangeSite_Web(event)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="exampleTel">Tel</label>
                    <input
                      name="tele"
                      id="exampleTel"
                      placeholder="tel"
                      type="number"
                      className="form-control"
                      onChange={(event) => ChangeTel(event)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="exampleAddress2">Address</label>
                    <input
                      name="address"
                      id="exampleAddress"
                      placeholder="Apartment, studio ,or floor"
                      type="text"
                      className="form-control"
                      onChange={(event) => ChangeAdress(event)}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="exampleVille">ville</label>
                    <input
                      name="ville"
                      id="exampleille"
                      placeholder="ville"
                      type="text"
                      className="form-control"
                      onChange={(event) => ChangeVille(event)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="exampleState">State</label>
                    <input
                      name="state"
                      id="exampleState"
                      type="text"
                      className="form-control"
                      onChange={(event) => ChangeState(event)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="examplecode_postal">code postal</label>
                    <input
                      name="code_postal"
                      id="examplecode_postal"
                      placeholder="1234"
                      type="number"
                      className="form-control"
                      onChange={(event) => ChangeCode_postal(event)}
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
