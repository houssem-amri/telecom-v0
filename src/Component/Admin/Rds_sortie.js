import React, { Fragment, useContext, useEffect, useState } from "react";
import Banner from "../Banner";
import axios from "axios";
import Modal_delete from "./Modal_delete";
import { useNavigate } from "react-router-dom";
import format from "date-fns/format";

export default function Rds_sortie() {
  const [Project, setProject] = useState([]);
  const [open, setOpen] = useState(false);

  const connectedUser = JSON.parse(
    localStorage.getItem("redux_localstorage_simple") || "[]"
  );
  useEffect(() => {
    getAllProject();
  }, []);

  const getAllProject = () => {
    axios
      .get(
        "http://localhost:3200/api/get_Project_attent/" +
          connectedUser.userData.magasin
      )
      .then((result) => {
        setProject(result.data.project);
        // console.log("value", result.data.project);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleEdit = (data) => {
    axios
      .put("http://localhost:3200/api/edit_project" , data)
      .then((result) => {
        console.log(result.data.message);
        getAllProject();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="app-main__inner">
      <Banner title="Mes Projet" icon="pe-7s-Fournisseurs" />
      <div className="row">
        <div className="col-12">
          <div className="main-card mb-3 card">
            <div className="card-body">
              <h5 className="card-title"> tableaux des Sortie</h5>
              <table className="mb-0 table">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>code article</th>
                    <th>quantite sortie</th>
                    <th>quantite stock</th>
                    <th>date</th>
                    <th>stock</th>
                    <th>Action </th>
                  </tr>
                </thead>
                <tbody>
                  {Project?.map((value, i) => (
                    <tr key={i}>
                      <td>{value.TypeSortie}</td>
                      <td>{value.idProduit.Code_article}</td>
                      <td>{value.quantitearticl}</td>
                      <td>{value.idProduit.quantitearticl}</td>
                      <td>
                        {format(new Date(value.DateDebut), "dd MMM yyyy")}
                      </td>

                      <td
                        style={{
                          color: `${
                            Number(value.quantitearticl) >
                            Number(value.idProduit.quantitearticl)
                              ? "red"
                              : "green"
                          }`,
                        }}
                      >
                        {Number(value.quantitearticl) >=
                        Number(value.idProduit.quantitearticl)
                          ? "non disponible in stock"
                          : "disponible in stock"}
                      </td>
                      <td>
                        {Number(value.quantitearticl) >
                        Number(value.idProduit.quantitearticl) ? null : (
                          <button
                            className="mb-2 mr-2 btn-transition btn btn-outline-success"
                            onClick={() => handleEdit(value)}
                          >
                            Ok
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
