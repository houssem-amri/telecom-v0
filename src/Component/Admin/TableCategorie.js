import React, { useEffect, useState } from "react";
import Banner from "../Banner";
import axios from "axios";
import Modal_delete from "./Modal_delete";
import { useNavigate } from "react-router-dom";

export default function TableCategorie() {
  const [categorie, setCategorie] = useState([]);
  const [open, setOpen] = useState(false);
  const [CategorieSelected, setCategorieSelected] = useState({});
  let navigate = useNavigate();
  useEffect(() => {
    getAllCategorie();
  }, []);
  const handleClickOpen = (categorie) => {
    setCategorieSelected(categorie);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    getAllCategorie();
  };


  const getAllCategorie = () => {
    axios
      .get("http://localhost:3200/api/get_Categorie")
      .then((result) => {
        setCategorie(result.data.categorie);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="app-main__inner">
      <Banner title="Mes Produits" icon="fa-shopping-cart" />
      <div className="row">
        <div className="col-12">
          <div className="main-card mb-3 card">
            <div className="card-body">
              <h5 className="card-title"> table des Categorie</h5>
              <table className="mb-0 table">
                <thead>
                  <tr>
                    <th>categorie article</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categorie?.map((value, i) => (
                    <tr key={i}>
                      <td>{value.categorie}</td>

                      <td>
                        <button className="mb-2 mr-2 btn-transition btn btn-outline-info"
                          onClick={() => navigate("/EditCategorie/" + value._id)}>
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
              {open ? (
                <Modal_delete
                  data={CategorieSelected}
                  open={open}
                  onClose={handleClose}
                  type="Categorie"
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
