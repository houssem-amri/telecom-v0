import React, { Fragment, useContext, useEffect, useState } from "react";
import Banner from "../Banner";
import axios from "axios";
import Modal_delete from "./Modal_delete";
import { useNavigate } from "react-router-dom";
import format from "date-fns/format";

export default function TableSortie() {
  const [Project, setProject] = useState([]);
  const [open, setOpen] = useState(false);
  const [ProjectSelected, setProjectSelected] = useState({});
  let navigate = useNavigate();
  const connectedUser = JSON.parse(
    localStorage.getItem("redux_localstorage_simple") || "[]"
  );
  useEffect(() => {
    getAllProject();
  }, []);

  const handleClickOpen = (project) => {
    setProjectSelected(project);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    getAllProject();
  };

  const getAllProject = () => {
    axios
      .get(
        "http://localhost:3200/api/get_sortie/" + connectedUser.userData.magasin
      )
      .then((result) => {
        setProject(result.data.data);
        console.log("value", result.data.data);
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
                    <th>nom magasin</th>
                    <th>code article</th>
                    <th>quantite</th>
                    <th>date</th>
                    <th>Action </th>
                  </tr>
                </thead>
                <tbody>
                  {Project?.map((value, i) => (
                    <tr key={i}>
                      <td>{value.TypeSortie}</td>
                      <td>{value.magasin.nomMagasin}</td>
                      <td>{value.idProduit.Code_article}</td>
                      <td>{value.quantitearticl}</td>
                      <td>
                        {format(new Date(value.DateDebut), "dd MMM yyyy")}
                      </td>
                      {console.log("value", value)}

                      <td
                        style={{
                          color: `${
                            value.etat === "attent"
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
                        {value.etat === "attent" ? (
                          <button
                            className="mb-2 mr-2 btn-transition btn btn-outline-danger"
                            onClick={() => handleClickOpen(value._id)}
                          >
                            <i
                              className="pe-7s-trash"
                              style={{ fontSize: 18 }}
                            ></i>
                          </button>
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {open ? (
                <Modal_delete
                  type="Project"
                  data={ProjectSelected}
                  open={open}
                  onClose={handleClose}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
