import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Banner from "../Banner";
import { useNavigate, useParams } from "react-router-dom";

export default function EditFournisseur() {
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
    let navigate = useNavigate()
    let param = useParams();
    useEffect(() => {
        getFournisseurById();
    }, []);
    const getFournisseurById = () => {
        axios
            .get("http://localhost:3200/api/get_fournisseur_byId/" + param.id)
            .then((result) => {
                let data = result.data.fournisseur;
                setNom(data.nom)
                setPrenom(data.prenom)
                setEmail(data.email)
                setTel(data.tel)
                setAdress(data.adress)
                setVille(data.ville)
                setState(data.state)
                setcode_postal(data.code_postal)
                setPoste_occupé(data.poste_occupe)
                setSite_Web(data.Site_Web)

            })
            .catch((err) => {
                console.log(err);
            });
    };

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
            _id: param.id,
            nom: nom,
            prenom: prenom,
            email: email,
            poste_occupe: poste_occupe,
            site_web: Site_Web,
            tel: tel,
            adress: adress,
            ville: ville,
            state: state,
            code_postal: code_postal,
        };
        console.log("here response", data);

        axios
            .put("http://localhost:3200/api/Update_Fournisseur", data)
            .then((response) => {
                console.log("here response", response.data.message);
                navigate("/Tablefournisseur")
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <Fragment>
            <div className="app-main__inner">
                <Banner title="Ajouter Fournisseur" icon="pe-7s-add-user" />
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
                                            value={nom || ""}
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
                                            value={prenom || ""}
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
                                            value={email || ""}
                                        />
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
                                            value={poste_occupe || ""}
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
                                            value={Site_Web || ""}
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
                                            value={tel || ""}
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
                                            value={adress || ""}
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
                                            value={ville || ""}
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
                                            value={state || ""}
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
                                            value={code_postal || ""}
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
