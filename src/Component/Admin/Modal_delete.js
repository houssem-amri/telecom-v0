import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import axios from "axios";

export default function Modal_delete(props) {
  const { open, data, onClose, type } = props;

  const handleClose = () => {
    onClose();
  };
  const deleteuser = () => {
    let url = "";
    if (type === "Produit") {
      url = "http://localhost:3200/api/delete_Products/" + data._id;
    }
    if (type === "Categorie") {
      url = "http://localhost:3200/api/delete_Categorie/" + data._id;
    }
    if (type === "Fournisseur") {
      url = "http://localhost:3200/api/delete_fournisseur/" + data._id;
    }
    if (type==="User") {
      url = "http://localhost:3200/api/delete_User/" + data._id;
 }
      if (type==="Commande") {
        url = "http://localhost:3200/api/delete_Commande/" + data._id;
  
      }
   
      if (type==="Magasin") {
        url = "http://localhost:3200/api/delete_Magasin/" + data._id;
  
      }
      
      if (type==="Project") {
        url = "http://localhost:3200/api/delete_Project/" + data._id;
  
      }
    axios.delete(url).then((result) => {
        console.log(result.data.message);
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xs"
    >
      <DialogTitle id="alert-dialog-title"></DialogTitle>
      <DialogContent sx={{ minWidth: 360 }}>
        <DialogContentText id="alert-dialog-description">
          Do you really want to delete these records? This process cannot be
          undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="error">
          cancel
        </Button>
        <Button onClick={deleteuser} color="success" autoFocus>
          delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
