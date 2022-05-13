import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import axios from "axios";

export default function DialogTache(props) {
  const { open, edit, onClose, idProjet, tacheSelected } = props;
  const [nom_tache, setnom_tache] = useState(
    edit ? tacheSelected.nom_tache : ""
  );
  const [description, setdescription] = useState(
    edit ? tacheSelected.description : ""
  );
  const [user, setuser] = useState(edit ? tacheSelected.user : "");
  const [date_debut, setdate_debut] = useState(
    edit ? tacheSelected.date_debut : ""
  );
  const [date_fin, setdate_fin] = useState(edit ? tacheSelected.date_fin : "");
  const [etat, setEtat] = useState(edit ? tacheSelected.etat : "");

  const handleClose = () => {
    onClose();
  };

  const handlSubmit = () => {
    let data = {};
    if (edit) {
      data = {
        _id: tacheSelected._id,
        nom_tache: nom_tache,
        description: description,
        user: user,
        date_debut: date_debut,
        date_fin: date_fin,
        etat: etat,
      };
      axios
        .put("http://localhost:3200/api/Update_tache", data)
        .then((result) => {
          handleClose();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      data = {
        _id: nom_tache,
        nom_tache: nom_tache,
        description: description,
        user: user,
        date_debut: date_debut,
        date_fin: date_fin,
        id_projet: idProjet,
        etat: etat,
      };

      axios
        .post("http://localhost:3200/api/ajouter_tache", data)
        .then((result) => {
          handleClose();
        })
        .catch((error) => {
          console.log(error);
        });
    }
    console.log("datadatadata", data);
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xl"
    >
      <DialogTitle id="alert-dialog-title">
        {edit ? "Add New" : "Edit"} Tache
      </DialogTitle>
      <DialogContent sx={{ minWidth: 360 }} dividers>
        <form>
          <div className="form-row">
            <div className="col-md-6">
              <div className="position-relative form-group">
                <label htmlFor="exampleEmail11">Nom Tache</label>
                <input
                  name="nom"
                  id="exampleNom"
                  placeholder="Nom"
                  type="text"
                  className="form-control"
                  onChange={(event) => setnom_tache(event.target.value)}
                  value={nom_tache || ""}
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="position-relative form-group">
                <label htmlFor="exampleEmail">nom user</label>
                <input
                  name="email"
                  id="exampleEmail11"
                  placeholder="Ville"
                  type="email"
                  className="form-control"
                  value={user || ""}
                  onChange={(event) => setuser(event.target.value)}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="position-relative form-group">
                <label htmlFor="examplePoste_occupé">Date debut</label>
                <input
                  name="Email"
                  id="exampleEmail"
                  placeholder="Email"
                  type="date"
                  className="form-control"
                  value={date_debut || ""}
                  onChange={(event) => setdate_debut(event.target.value)}
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="position-relative form-group">
                <label htmlFor="exampleTel">Date fin</label>
                <input
                  name="tele"
                  id="exampleTel"
                  placeholder="tel"
                  type="date"
                  className="form-control"
                  value={date_fin || ""}
                  onChange={(event) => setdate_fin(event.target.value)}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="position-relative form-group">
                <label htmlFor="exampleTel">Etat</label>
                <select
                  name="categorie"
                  className="form-control"
                  onChange={(event) => setEtat(event.target.value)}
                  value={etat}
                >
                  <option value="">Sélectionner Etat</option>

                  <option value="en cours">en cours</option>
                  <option value="termine">Termine </option>
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="position-relative form-group">
                <label htmlFor="examplePassword11">description</label>
                <textarea
                  name="Prénom"
                  id="examplePassword11"
                  placeholder="description ..."
                  type="text"
                  className="form-control"
                  value={description || ""}
                  onChange={(event) => setdescription(event.target.value)}
                />
              </div>
            </div>
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="error">
          cancel
        </Button>
        <Button onClick={handlSubmit} color="success" autoFocus>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
