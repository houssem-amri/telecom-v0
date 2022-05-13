import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Banner from "../Banner";
import { useNavigate, useParams } from "react-router-dom";

export default function Add_project() {
    const [NomProjet, setNomProjet] = useState("");
    const [lieuProjet, setlieuProjet] = useState("");
    const [chefProjet, setchefProjet] = useState("");
    const [quantitearticl, setquantitearticl] = useState("");
    const [DateDebut, setDateDebut] = useState("");
    const [etat, setEtat] = useState("");
    let navigate = useNavigate()
    let param = useParams();
    useEffect(() => {
        getProjectById();
    }, []);
    const getProjectById = () => {
        axios
            .get("http://localhost:3200/api/get_Project_byId/" + param.id)
            .then((result) => {
                let data = result.data.project;
                setNomProjet(data.NomProjet)
                setlieuProjet(data.lieuProjet)
                setchefProjet(data.chefProjet)
                setDateDebut(data.DateDebut)
                setquantitearticl(data.setquantitearticl)
                setEtat(data.etat);
             
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const ChangeEtatProject = (e) => {
        setEtat(e.target.value);
      };
    const ChangeNomProjet = (event) => {
        setNomProjet(event.target.value);
    };
    const ChangelieuProjet = (event) => {
        setlieuProjet(event.target.value);
    };
    const ChangechefProjet = (event) => {
        setchefProjet(event.target.value);
    };
    const ChangeDateDebut = (event) => {
        setDateDebut(event.target.value);
    };
    const Changequantitearticl = (event) => {
        setquantitearticl(event.target.value);
    };
    const HandleSubmit = () => {
        let data = {
            _id: param.id,
            NomProjet: NomProjet,
            lieuProjet: lieuProjet,
            chefProjet: chefProjet,
            DateDebut: DateDebut,
            quantitearticl: quantitearticl,
            etat: etat,

        };
        console.log("here response", data);
        axios
            .put("http://localhost:3200/api/Update_Project", data)
            .then((response) => {
                console.log("here response", response.data.message);
                navigate("/Tableproject")
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <Fragment>
            <div className="app-main__inner">
                <Banner title="Ajouter Project " icon="pe-7s-add-user" />
                <div className="main-card mb-3 card">
                    <div className="card-body">
                        <h1 className="card-title">Remplir le formulaire</h1>
                        <form>
                            <div className="form-row">

                                <div className="col-md-12">
                                    <div className="position-relative form-group">
                                    <label htmlFor="examplePassword11">Etat Projet</label>
                                        <select
                                            name="categorie"
                                            className="form-control"
                                            onChange={(event) => ChangeEtatProject(event)}
                                            value={etat}
                                        >
                                            <option value="">Sélectionner Etat Commande </option>
                                            <option value="accepter">accepter</option>
                                            <option value="attente">attente</option>
                                            <option value="anullée">anullée </option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="position-relative form-group">
                                    <label htmlFor="exampleEmail11">Nom Projet</label>
                                        <input
                                            name="NomProjet"
                                            id="exampleNomProjet"
                                            placeholder="NomProjet"
                                            type="text"
                                            className="form-control"
                                            onChange={(event) => ChangeNomProjet(event)}
                                            value={NomProjet || ""}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="position-relative form-group">
                                        <label htmlFor="examplePassword11">
                                            lieuProjet
                                        </label>
                                        <input
                                            name="Li"
                                            id="lieuProjet"
                                            placeholder="lieuProjet"
                                            type="text"
                                            className="form-control"
                                            onChange={(event) => ChangelieuProjet(event)}
                                            value={lieuProjet || ""}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="position-relative form-group">
                                        <label htmlFor="exampleEmail">chef Projet</label>
                                        <input
                                            name="chefProjet"
                                            id="examplechefProjet"
                                            placeholder="chefProjet"
                                            type="text"
                                            className="form-control"
                                            onChange={(event) => ChangechefProjet(event)}
                                            value={chefProjet || ""}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="position-relative form-group">
                                        <label htmlFor="exampleTele">quantitearticl</label>
                                        <input
                                            name="quantitearticl"
                                            id="examplequantitearticl"
                                            placeholder="Qte"
                                            type="number"
                                            className="form-control"
                                            onChange={(event) => Changequantitearticl(event)}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="position-relative form-group">
                                        <label htmlFor="exampleEmail">date Debut</label>
                                        <input
                                            name="DateDebut"
                                            id="exampleDateDebut"
                                            placeholder="DateDebut"
                                            type="date"
                                            className="form-control"
                                            onChange={(event) => ChangeDateDebut(event)}
                                            value={DateDebut || ""}
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
