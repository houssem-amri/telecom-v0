import React, { useContext, useEffect, useState } from "react";
import Modal_delete from "./Modal_delete";
import Banner from "../Banner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Tableproducts() {
  const [Products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [ProductsSelected, setProductsSelected] = useState({});

  const connectedUser = JSON.parse(
    localStorage.getItem("redux_localstorage_simple") || "[]"
  );
  let navigate = useNavigate();
  const handleClickOpen = (products) => {
    setProductsSelected(products);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    getAllProducts();
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = () => {
    axios
      .get("http://localhost:3200/api/get_Products")
      .then((result) => {
        setProducts(result.data.data);
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
              <h5 className="card-title"> table des Produit</h5>
              <table className="mb-0 table">
                <thead>
                  <tr>
                    <th>categorie article</th>
                    <th>lieu de stokage </th>
                    <th>code</th>
                    <th>reference</th>
                    <th>type</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Products?.map((value, i) => {
                    if (connectedUser.userData.magasin === value.magasin) {
                      return (
                        <tr key={i}>
                          <td>{value.categorie}</td>
                          <td>{value.lieu_de_stokage}</td>
                          <td>{value.Code_article}</td>
                          <td>{value.reference}</td>
                          <td>{value.type}</td>
                          <td>
                            <button
                              className="mb-2 mr-2 btn-transition btn btn-outline-info"
                              onClick={() =>
                                navigate("/EditProducts/" + value._id)
                              }
                            >
                              <i
                                className="pe-7s-pen"
                                style={{ fontSize: 18 }}
                              ></i>
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
                      );
                    }
                  })}
                </tbody>
              </table>
              {open ? (
                <Modal_delete
                  data={ProductsSelected}
                  open={open}
                  onClose={handleClose}
                  type="Produit"
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
