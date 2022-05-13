import React, { useEffect, useState } from "react";
import Banner from "../Banner";
import DialogTache from "./DialogTache";
import axios from "axios";
import { useParams } from "react-router-dom";
import format from "date-fns/format";

export default function Todo_list() {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [edit, setEdit] = useState(false);
  const [tacheSelected, settacheSelected] = useState({});
  const [Taches, setTaches] = useState([]);

  let param = useParams();

  useEffect(() => {
    getAllTaches();
  }, []);

  const getAllTaches = () => {
    axios
      .get("http://localhost:3200/api/get_tache_byProjet/" + param.id)
      .then((result) => {
        setTaches(result.data.data);
        console.log("value", result.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleOpendialog = (data) => {
    settacheSelected(data);
    setOpen(true);
    setEdit(true);
  };
  const handleClosedialog = () => {
    getAllTaches();
    settacheSelected({});
    setOpen(false);
    setEdit(false);
  };

  const handledeleteTache=()=>{
    alert('heello')
  }

  return (
    <div className="app-main__inner">
      <Banner title="To Do Projet" icon="pe-7s-Fournisseurs" />
      <div className="row">
        <div className=" col-12 main-card mb-3 card">
          <div className="card-header">ToDo List</div>
          <ul className="todo-list-wrapper list-group list-group-flush">
            {Taches?.map((value, i) => (
              <li className="list-group-item" key={i}>
                <div className="todo-indicator bg-warning" />
                <div className="widget-content p-0">
                  <div className="widget-content-wrapper">
                    <div className="widget-content-left mr-2">
                      <div className="custom-checkbox custom-control">
                        <input
                          type="checkbox"
                          id="exampleCustomCheckbox12"
                          className="custom-control-input"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="exampleCustomCheckbox12"
                        >
                          &nbsp;
                        </label>
                      </div>
                    </div>
                    <div className="widget-content-left">
                      <div className="widget-heading">
                        {value.nom_tache}
                        {value.etat === "en cours" ? (
                          <div className="badge badge-warning ml-2">
                            {value.etat}
                          </div>
                        ) : (
                          <div className="badge badge-success ml-2">
                            {value.etat}
                          </div>
                        )}
                        <div className="badge badge-info ml-2">
                          {value.user}
                        </div>
                      </div>
                      <div className="widget-subheading">
                        <i>{value.description}</i>
                      </div>
                      <div className="widget-subheading">
                        <i>
                          from:{" "}
                          <b>
                            {format(new Date(value.date_debut), "dd MMM yyyy")}
                          </b>{" "}
                          to:{" "}
                          <b>
                            {format(new Date(value.date_fin), "dd MMM yyyy")}
                          </b>
                        </i>
                      </div>
                    </div>
                    <div className="widget-content-right widget-content-actions">
                      <button
                        className="border-0 btn-transition btn btn-outline-info"
                        onClick={() => handleOpendialog(value)}
                      >
                        <i className="fa fa-pencil" />
                      </button>
                      <button
                        className="border-0 btn-transition btn btn-outline-danger"
                        onClick={() => handledeleteTache(value)}
                      >
                        <i className="fa fa-trash" />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="d-block text-right card-footer">
            <button
              className="btn btn-info btn-lg"
              onClick={() => setOpen(true)}
            >
              new tache
            </button>
          </div>
        </div>
      </div>
      {open ? (
        <DialogTache
          open={open}
          onClose={handleClosedialog}
          edit={edit}
          idProjet={param.id}
          tacheSelected={tacheSelected}
        />
      ) : null}
    </div>
  );
}
