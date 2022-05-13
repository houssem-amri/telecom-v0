import React, { useEffect, useState } from "react";
import Banner from "../Banner";
import axios from "axios";
import Modal_delete from "./Modal_delete";
import { useNavigate } from "react-router-dom";

export default function Tablefournisseur() {
  const [Magasin,setMagasin] = useState([]);
    const [open, setOpen] = useState(false);
    const [MagasinSelected, setMagasinSelected] = useState({});
    let navigate = useNavigate();

    useEffect(() => {
        getAllMagasin();
    }, []);
    
  const handleClickOpen = (magasin) => {
    setMagasinSelected(magasin)
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    getAllMagasin();
  };

  useEffect(() => {
    getAllMagasin();
  }, []);

  const getAllMagasin = () => {
    axios
      .get("http://localhost:3200/api/get_Mgasain")
      .then((result) => {
        setMagasin(result.data.Magasin);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  return (
    <div className="app-main__inner">
      <Banner title="Mes Magasin" icon="pe-7s-Fournisseurs" />
      <div className="row">
        <div className="col-12">
          <div className="main-card mb-3 card">
            <div className="card-body">
              <h5 className="card-title"> tableaux des magasin</h5>
              <table className="mb-0 table">
                <thead>
                  <tr>
                    <th>Nom Magasin</th>
                    <th>Adress</th>
                    <th>FIXE</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Magasin?.map((value, i) => (
                    <tr key={i}>
                      <td>{value.nomMagasin}</td>
                      <td>{value.adress}</td>
                      <td>{value.fixe}</td>
                      <td>
                        <button className="mb-2 mr-2 btn-transition btn btn-outline-info"
                         onClick={() => navigate("/EditMagasin/" + value._id)}>
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
              {open? <Modal_delete type="Magasin"  data={MagasinSelected} open={open}  onClose={handleClose}/> :null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
