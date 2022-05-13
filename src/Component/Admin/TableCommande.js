import React, { Fragment, useContext, useEffect, useState } from "react";
import Banner from "../Banner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import format from "date-fns/format";

export default function TableCommande() {
  const [Commande, setCommande] = useState([]);
  const connectedUser = JSON.parse(
    localStorage.getItem("redux_localstorage_simple") || "[]"
  );
  let navigate = useNavigate();

  useEffect(() => {
    getAllCommande();
  }, []);

  const getAllCommande = () => {
    axios
      .get("http://localhost:3200/api/get_Commande")
      .then((result) => {
        setCommande(result.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="app-main__inner">
      <Banner title="Mes Commandes" icon="fa-shopping-cart" />
      <div className="row">
        <div className="col-12">
          <div className="main-card mb-3 card">
            <div className="card-body">
              <h5 className="card-title"> table des Commandes</h5>
              <table
                id="example"
                className="table table-hover table-striped table-bordered"
              >
                <thead>
                  <tr>
                    <th> code article</th>
                    <th> categorie article</th>
                    <th> reference article</th>
                    <th> quantité article</th>
                    <th> nom fournisseur</th>
                    <th>date commande</th>
                    <th>etat commande</th>
                  </tr>
                </thead>
                <tbody>
                  {Commande?.map((value, i) => {
                    if (connectedUser.userData.magasin === value.magasin) {
                      return (
                        <tr key={i}>
                          <td>{value.Code_article}</td>
                          <td>{value.categorie}</td>
                          <td>{value.reference}</td>
                          {value.Existance_article === "false" ? (
                            <td>{value.quantitearticl}</td>
                          ) : (
                            <td>{value.NewQty}</td>
                          )}
                          <td>
                            {value.idFournisseur.nom}{" "}
                            {value.idFournisseur.prenom}
                          </td>
                          <td>
                            {format(
                              new Date(value.datecommande),
                              "dd MMM yyyy"
                            )}
                          </td>
                          <td
                            style={{
                              color: `${
                                value.etat === "attente"
                                  ? "orange"
                                  : value.etat === "accepter"
                                  ? "green"
                                  : "red"
                              }`,
                            }}
                          >
                            {value.etat}
                          </td>

                          <td>
                            {connectedUser.userData.Poste === "admin" ||
                            connectedUser.userData.Poste === "super_admin" ? (
                              <Fragment>
                                {value.etat ==="attente"?(
                                   <button
                                   className="mb-2 mr-2 btn-transition btn btn-outline-info"
                                   onClick={() =>
                                     navigate("/Edit_Commande/" + value._id)
                                   }
                                 >
                                   <i
                                     className="pe-7s-pen"
                                     style={{ fontSize: 18 }}
                                   ></i>
                                 </button>
                                ):null}
                              </Fragment>
                             
                            ) : null}
                          </td>
                        </tr>
                      );
                    }
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
