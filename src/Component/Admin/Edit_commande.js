import React, { Fragment, useContext, useEffect, useState } from "react";
import Banner from "../Banner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function Edit_commande() {
  const [nomarticle, setNomarticle] = useState("");
  const [codearticle, setCodearticle] = useState("");
  const [categorie_article, setCategorie_article] = useState("");
  const [quantitearticl, setQuantitearticle] = useState("");
  const [idFournisseur, setidFournisseur] = useState("");
  const [datecommande, setDatecommande] = useState("");
  const [etat, setEtat] = useState("");
  const [commande, setcommandet] = useState("");

  let param = useParams();
  let navigate = useNavigate();
  useEffect(() => {
    getCommandeById();
  }, []);

  const getCommandeById = () => {
    axios
      .get("http://localhost:3200/api/get_commande_byId/" + param.id)
      .then((result) => {
        let data = result.data.Commande;
        setcommandet(data)
        // setNomarticle(data.nomarticle);
        // setCodearticle(data.codearticle);
        // setCategorie_article(data.categorie_article);
        // setQuantitearticle(data.quantitearticl);
        // setidFournisseur(data.idFournisseur);
        // setDatecommande(data.datecommande);
        setEtat(data.etat);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ChangeEtatCammande = (e) => {
    setEtat(e.target.value);
  };

  const HandleSubmit = () => {
    let data={}
    if (commande. Existance_article==="true") {
      data = {
        _id:param.id,
        id_article:commande. id_article,
        Code_article:commande. Code_article,
        lieu_de_stokage:commande. lieu_de_stokage,
        quantitearticl:commande. quantitearticl,
        categorie:commande. categorie,
        reference:commande. reference,
        type_article: commande.type_article,
        idFournisseur:commande. idFournisseur._id,
        Existance_article:commande. Existance_article,
        datecommande:commande. datecommande,
        etat: etat,
        magasin:commande.magasin,
        NewQty:commande.NewQty,
      };
    }
    if (commande. Existance_article==="false") {
      data = {
        _id:param.id,
        Code_article:commande. Code_article,
        lieu_de_stokage:commande. lieu_de_stokage,
        quantitearticl:commande. quantitearticl,
        categorie:commande. categorie,
        reference:commande. reference,
        type_article: commande.type_article,
        idFournisseur:commande. idFournisseur._id,
        Existance_article:commande. Existance_article,
        datecommande:commande. datecommande,
        etat: etat,
        magasin:commande.magasin,
      };
    }
    
    console.log("here response", data);
    axios
      .put("http://localhost:3200/api/Update_commande", data)
      .then((response) => {
        console.log("here response", response.data.message);
        navigate("/TableCommande");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Fragment>
      <div className="app-main__inner">
        <Banner title="Modifier Commande" icon="pe-7s-add-user" />
        <div className="main-card mb-3 card">
          <div className="card-body">
            <h1 className="card-title">Remplir le formulaire</h1>
            <form>
              <div className="form-row">
                <div className="col-md-12">
                  <div className="position-relative form-group">
                    <label htmlFor="examplePassword11">Etat Commande</label> 
                    <select
                      name="categorie"
                      className="form-control"
                      onChange={(event) => ChangeEtatCammande(event)}
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
                    <label htmlFor="exampleCodearticle">Existance article</label>
                    <input
                      name="nomCodearticle"
                      id="exampleCode article"
                      placeholder="Codearticle"
                      type="text"
                      className="form-control"
                      // onChange={(event) => ChangeCodearticle(event)}
                      disabled
                      value={commande.Existance_article || ""}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="exampleCodearticle">reference Article</label>
                    <input
                      name="nomCodearticle"
                      id="exampleCode article"
                      placeholder="Codearticle"
                      type="text"
                      className="form-control"
                      // onChange={(event) => ChangeCodearticle(event)}
                      disabled
                      value={commande.reference || ""}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="exampleCodearticle">Code Article</label>
                    <input
                      name="nomCodearticle"
                      id="exampleCode article"
                      placeholder="Codearticle"
                      type="text"
                      className="form-control"
                      // onChange={(event) => ChangeCodearticle(event)}
                      disabled
                      value={commande.Code_article || ""}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="examplePassword11">categorie_article</label>
                    <input
                      name="nomCodearticle"
                      id="exampleCode article"
                      placeholder="Codearticle"
                      type="text"
                      className="form-control"
                      // onChange={(event) => ChangeCodearticle(event)}
                      disabled
                      value={commande.categorie || ""}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="exampleQuantitearticl">
                      Quantite articl
                    </label>
                    <input
                      name="nomQuantitearticl"
                      id="exampleQuantitearticl"
                      placeholder="1234"
                      type="number"
                      className="form-control"
                      // onChange={(event) => ChangeQuantitearticle(event)}
                      disabled
                      value={commande.Existance_article==="true"?commande.NewQty :commande.quantitearticl || ""}
                    />
                  </div>
                </div>
              

                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="exampleDatecommande">Date commande</label>
                    <input
                      name="nomDatecommande"
                      id="exampleDatecommande"
                      type="text"
                      className="form-control"
                      // onChange={(event) => ChangeDatecommande(event)}
                      disabled
                      value={commande.datecommande || ""}
                    />
                  </div>
                </div>

                <button
                  type="button"
                  className="mt-2 btn btn-primary"
                  onClick={HandleSubmit}
                >
                  Envoyer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
