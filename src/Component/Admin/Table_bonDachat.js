import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Banner from "../Banner";
import ReactToPrint from "react-to-print";
import { format } from "date-fns";

const pageStyle = `
@media all {
  .page-header {
     overflow: hidden; height: 0; 
  }

}

@media print {
  html, body {
    height: initial !important;
    overflow: initial !important;
    -webkit-print-color-adjust: exact;
  }
}

@media print {
  .page-break {
    display: block;
    page-break-before: always;
  }
  .page-header{
    margin: 10mm;
    display: block;
    height: initial !important;
    overflow: initial !important;
    page-break-before: auto;
  }
  .invoice{
    display: flex !important;
    justify-content: center!important;
    align-items: center !important;
    width: auto !important;
    height: auto !important;
    break-inside: avoid;

    }
  
}

@page {
  size: auto;
  margin: 10mm;
}
`;
export default function Table_bonDachat() {
  const [bonDachat, setBonDachat] = useState([]);
  const [orderSelected, setorderSelected] = useState({});
  const [print, setprint] = useState(false);
  const connectedUser = JSON.parse(
    localStorage.getItem("redux_localstorage_simple") || "[]"
  );
  const myRef = useRef();
  let navigate = useNavigate();
  useEffect(() => {
    getAllBonDachat();
  }, []);
  const PrintInvoice = (data) => {
    console.log("PrintInvoice", data);
    setorderSelected(data);
    setprint(true);
  };
  const getAllBonDachat = () => {
    axios
      .get("http://localhost:3200/api/get_commande_etat")
      .then((result) => {
        let data = result.data.Commande;
        setBonDachat(data);
        console.log("hereee bon d'achat", data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="app-main__inner">
      <Banner title="Bon d'achat" icon="fa-shopping-cart" />
      <div className="row">
        <div className="col-12">
          <div className="main-card mb-3 card">
            <div className="card-body">
              <h5 className="card-title"> table Bon d'achat</h5>
              <table className="mb-0 table">
                <thead>
                  <tr>
                    <th>Code_article</th>
                    <th>reference</th>
                    <th>categorie</th>
                    <th>quantité</th>
                    <th>print bon d'achat</th>
                  </tr>
                </thead>
                <tbody>
                  {bonDachat?.map((value, i) => {
                    if (connectedUser.userData.magasin === value.magasin._id) {
                      return (
                        <tr key={i}>
                          <td>{value.Code_article}</td>
                          <td>{value.reference}</td>
                          <td>{value.categorie}</td>
                          <td>{value.NewQty}</td>
                          <td>{value.datecommande}</td>

                          <td>
                            <ReactToPrint
                              trigger={() => {
                                return (
                                  <button
                                    href="#"
                                    className="mb-2 mr-2 btn-transition btn btn-outline-info"
                                    onClick={PrintInvoice(value)}
                                  >
                                    <i
                                      className="pe-7s-print"
                                      style={{ fontSize: 18 }}
                                    ></i>{" "}
                                  </button>
                                );
                              }}
                              documentTitle="Bon d'achat telecom"
                              content={() => myRef.current}
                              pageStyle={pageStyle}
                            />
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

      <div
        className="page-header"
        ref={myRef}
        style={{ overflow: "hidden", height: 0 }}
      >
        {print ? (
          <div>
            <div className="container">
              <div className="card">
                <div className="card-header">
                  Invoice
                  <strong style={{ paddingLeft: "20%" }}>
                    {" "}
                    {format(new Date(Date.now()), "dd MMM yyyy ")}
                  </strong>
                  <span style={{ paddingLeft: "40%" }}>
                    {" "}
                    <strong>Status:</strong> Placed
                  </span>
                </div>
                <div className="card-body">
                  <div className="row mb-4">
                    <div className="col-6">
                      <h6 className="mb-3">Fournisseur:</h6>
                      <div>
                        <strong>
                          {orderSelected.idFournisseur.prenom}{" "}
                          {orderSelected.idFournisseur.nom}
                        </strong>
                      </div>
                      <div>Adress{orderSelected.idFournisseur.adress}</div>
                      <div>Email: {orderSelected.idFournisseur.email}</div>
                      <div>
                        Site web: {orderSelected.idFournisseur.site_web}
                      </div>
                      <div>Phone: {orderSelected.idFournisseur.tel}</div>
                      <div>
                        code_postal: {orderSelected.idFournisseur.code_postal}
                      </div>
                    </div>
                    <div className="col-6 float-right">
                      <h6 className="mb-3">Telecom:</h6>
                      <div>
                        {/* <strong>{data.userId?.nom} {data.userId?.prenom}</strong> */}
                      </div>
                      <div>
                        <strong>{orderSelected.magasin.nomMagasin}</strong>{" "}
                      </div>
                      <div>Adress: {orderSelected.magasin.adress}</div>
                      <div>Ville: {orderSelected.magasin.ville}</div>
                      <div>Email: {orderSelected.magasin.email}</div>
                      <div>Phone: {orderSelected.magasin.fixe}</div>
                    </div>
                  </div>
                  <div className="table-responsive-sm">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Code_article</th>
                          <th>reference</th>
                          <th>categorie</th>
                          <th>quantité</th>
                          <th>date</th>
                        </tr>
                      </thead>
                      <tbody>
                        <td>{orderSelected.Code_article}</td>
                        <td>{orderSelected.reference}</td>
                        <td>{orderSelected.categorie}</td>
                        <td>{orderSelected.NewQty}</td>
                        <td>{orderSelected.datecommande}</td>
                      </tbody>
                    </table>
                  </div>
                  <div className="row">
                    <div className="col-8"></div>
                    <div className="col-4"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
