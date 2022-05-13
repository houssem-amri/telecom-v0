import React, { useEffect, useState } from "react";
import Banner from "../Banner";
import axios from "axios";
import Modal_delete from "./Modal_delete";
import { useNavigate } from "react-router-dom";

export default function Tablefournisseur() {
  const [fournisseur, setFournisseur] = useState([]);
    const [open, setOpen] = useState(false);
    const [FournisseurSelected, setFournisseurSelected] = useState({});
    
    let navigate = useNavigate();

    useEffect(() => {
        getAllFournisseur();
    }, []);
    
  const handleClickOpen = (fournisseur) => {
    setFournisseurSelected(fournisseur)
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    getAllFournisseur();
  };

  useEffect(() => {
    getAllFournisseur();
  }, []);

  const getAllFournisseur = () => {
    axios
      .get("http://localhost:3200/api/get_fournisseur")
      .then((result) => {
        setFournisseur(result.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  return (
    <div className="app-main__inner">
      <Banner title="Mes Fournisseur" icon="pe-7s-Fournisseurs" />
      <div className="row">
        <div className="col-12">
          <div className="main-card mb-3 card">
            <div className="card-body">
              <h5 className="card-title"> table Fournisseur</h5>
              <table className="mb-0 table">
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Prenom</th>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {fournisseur.map((value, i) => (
                    <tr key={i}>
                      <td>{value.nom}</td>
                      <td>{value.prenom}</td>
                      <td>{value.email}</td>
                      <td>
                        <button className="mb-2 mr-2 btn-transition btn btn-outline-info"
                         onClick={() => navigate("/EditFournisseur/" + value._id)}>
                          <i className="pe-7s-pen" style={{ fontSize: 18 }}></i>
                        </button>
                        <button
                          className="mb-2 mr-2 btn-transition btn btn-outline-danger"
                          onClick={() => handleClickOpen(value)}
                        >
                          <i
                            className="pe-7s-trash"
                            style={{ fontSize: 18 }}
                          ></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {open? <Modal_delete type="Fournisseur"  data={FournisseurSelected} open={open}  onClose={handleClose}/> :null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
