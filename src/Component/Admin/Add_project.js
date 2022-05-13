import axios from "axios";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Banner from "../Banner";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export default function Add_project() {
  const [NomProjet, setNomProjet] = useState("");
  const [lieuProjet, setlieuProjet] = useState("");
  const [chefProjet, setchefProjet] = useState("");
  const [quantitearticl, setquantitearticl] = useState("");
  const [DateDebut, setDateDebut] = useState("");
  const [TypeSortie, setTypeSortie] = useState("");
  const [Products, setProducts] = useState([]);
  const [ProductSelected, setProductSelected] = useState();

  const [activeStep, setActiveStep] = React.useState(0);
  const connectedUser = JSON.parse(
    localStorage.getItem("redux_localstorage_simple") || "[]"
  );

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = () => {
    axios
      .get(
        "http://localhost:3200/api/get_Products_byIdMagasin/" +
          connectedUser.userData.magasin
      )
      .then((result) => {
        setProducts(result.data.Products);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleFinish = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    let data = {};
    if (TypeSortie === "extension" || TypeSortie === "entretien") {
      data = {
        TypeSortie: TypeSortie,
        idProduit: ProductSelected,
        quantitearticl: quantitearticl,
        DateDebut: Date.now(),
        magasin: connectedUser.userData.magasin,
        user: connectedUser.userData.id,
        etat: "attent",
      };
    } else {
      data = {
        TypeSortie: TypeSortie,
        NomProjet: NomProjet,
        lieuProjet: lieuProjet,
        chefProjet: chefProjet,
        idProduit: ProductSelected,
        quantitearticl: quantitearticl,
        DateDebut: Date.now(),
        magasin: connectedUser.userData.magasin,
        user: connectedUser.userData.id,
        etat: "attent",
      };
    }
    axios
      .post("http://localhost:3200/api/ajouter_project", data)
      .then((response) => {
        console.log("here response", response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  let navigate = useNavigate();
  const ChangeNomProjet = (event) => {
    setNomProjet(event.target.value);
  };
  const ChangelieuProjet = (event) => {
    setlieuProjet(event.target.value);
  };
  const ChangechefProjet = (event) => {
    setchefProjet(event.target.value);
  };
  const ChangeDateDebut = (event) => {
    setDateDebut(event.target.value);
  };
  const Changequantitearticl = (event) => {
    setquantitearticl(event.target.value);
  };

  const ChangeproductSelected = (event) => {
    setProductSelected(event);
  };


  const StepTwo = () => {
    return (
      <form>
        {TypeSortie === "extension" || TypeSortie === "entretien" ? (
          <div className="form-row">
            <div className="col-md-6">
              <div className="position-relative form-group">
                <label htmlFor="exampleTele">Produit</label>
                <select
                  name="categorie"
                  className="form-control"
                  onChange={(event) =>
                    ChangeproductSelected(event.target.value)
                  }
                >
                  <option value="">Sélectionner Produit </option>

                  {Products.map((value, i) => (
                    <option key={i} value={value._id}>
                      {value.Code_article}{" "}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="position-relative form-group">
                <label htmlFor="exampleTele">quantitearticl</label>
                <input
                  name="quantitearticl"
                  id="examplequantitearticl"
                  placeholder="Qte"
                  type="number"
                  className="form-control"
                  onChange={(event) => Changequantitearticl(event)}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="form-row">
            <div className="col-md-6">
              <div className="position-relative form-group">
                <label htmlFor="exampleEmail11">Nom Projet</label>
                <input
                  name="NomProjet"
                  id="exampleNomProjet"
                  placeholder="NomProjet"
                  type="text"
                  className="form-control"
                  onChange={(event) => ChangeNomProjet(event)}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="position-relative form-group">
                <label htmlFor="examplePassword11">lieuProjet</label>
                <input
                  name="Li"
                  id="lieuProjet"
                  placeholder="lieuProjet"
                  type="text"
                  className="form-control"
                  onChange={(event) => ChangelieuProjet(event)}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="position-relative form-group">
                <label htmlFor="exampleEmail">chefProjet</label>
                <input
                  name="chefProjet"
                  id="examplechefProjet"
                  placeholder="chefProjet"
                  type="text"
                  className="form-control"
                  onChange={(event) => ChangechefProjet(event)}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="position-relative form-group">
                <label htmlFor="exampleTele">Produit</label>
                <select
                  name="categorie"
                  className="form-control"
                  onChange={(event) =>
                    ChangeproductSelected(event.target.value)
                  }
                >
                  <option value="">Sélectionner Produit </option>

                  {Products.map((value, i) => (
                    <option key={i} value={value._id}>
                      {value.Code_article}{" "}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="position-relative form-group">
                <label htmlFor="exampleTele">quantite </label>
                <input
                  name="quantitearticl"
                  id="examplequantitearticl"
                  placeholder="Qte"
                  type="number"
                  className="form-control"
                  onChange={(event) => Changequantitearticl(event)}
                />
              </div>
            </div>
          </div>
        )}
      </form>
    );
  };
  const firstStep = () => {
    return (
      <form>
        <div className="form-row">
          <div className="col-md-12">
            <div className="position-relative form-group">
              <label htmlFor="exampleEmail11">Type de sortie</label>
              <select
                name="categorie"
                className="form-control"
                onChange={(event) => setTypeSortie(event.target.value)}
              >
                <option value="">Sélectionner Type de sortie </option>
                <option value="extension">Extension </option>
                <option value="entretien">Entretien </option>
                <option value="projet">Grand projet </option>
              </select>
            </div>
          </div>
        </div>
      </form>
    );
  };

  const steps = [
    {
      label: "Select campaign settings",
      description: firstStep(),
    },
    {
      label: "Create an ad group",
      description: StepTwo(),
    },
    {
      label: "Create an ad",
      description: `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`,
    },
  ];
  return (
    <Fragment>
      <div className="app-main__inner">
        <Banner title="Ajouter Projet " icon="pe-7s-add-user" />
        <div className="main-card mb-3 card">
          <div className="card-body">
            <h1 className="card-title">Remplir le formulaire</h1>
            <Box sx={{ width: "100%" }}>
              <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                  <Step key={step.label}>
                    <StepLabel
                      optional={
                        index === 2 ? (
                          <Typography variant="caption">Last step</Typography>
                        ) : null
                      }
                    >
                      {step.label}
                    </StepLabel>
                    <StepContent>
                      <Typography>{step.description}</Typography>
                      <Box sx={{ mb: 2 }}>
                        <div>
                          <Button
                            variant="contained"
                            onClick={
                              index === steps.length - 1
                                ? handleFinish
                                : handleNext
                            }
                            sx={{ mt: 1, mr: 1 }}
                          >
                            {index === steps.length - 1 ? "Finish" : "Continue"}
                          </Button>
                          <Button
                            disabled={index === 0}
                            onClick={handleBack}
                            sx={{ mt: 1, mr: 1 }}
                          >
                            Back
                          </Button>
                        </div>
                      </Box>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
              {activeStep === steps.length && (
                <Paper square elevation={0} sx={{ p: 3 }}>
                  <Typography>
                    All steps completed - you&apos;re finished
                  </Typography>
                  <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                    Reset
                  </Button>
                </Paper>
              )}
            </Box>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
