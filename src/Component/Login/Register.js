import * as React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  nom_utilisateur: yup.string().required("You must enter your name"),
  prenom_utilisateur: yup.string().required("You must enter your name"),
  email: yup
    .string()
    .email("You must enter a valid email")
    .required("You must enter a email"),
  password: yup
    .string()
    .required("Please enter your password.")
    .min(8, "Password is too short - should be 8 chars minimum."),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  nomMagasin: yup.string().required("You must enter your name"),
  adress: yup.string().required("You must enter your name"),
  ville: yup.string().required("You must enter your name"),
  magasinEmail: yup
    .string()
    .email("You must enter a valid email")
    .required("You must enter a email"),
  fixe: yup.string().required("You must enter your name"),
  type: yup.string().required("You must enter your name"),
});

export default function Register() {
  let navigate = useNavigate();
  const [errMsg, seterrMsg] = React.useState("");

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid, dirtyFields },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",

    resolver: yupResolver(schema),
  });

  const onSubmit = (event) => {
    // event.preventDefault();
    console.log(errors);
    let body = {
      NomUtilisateur: event.nom_utilisateur,
      PrenomUtilisateur: event.prenom_utilisateur,
      Email: event.email,
      password: event.password,
      passwordConfirm: event.passwordConfirm,
      Poste: "super_admin",
      nomMagasin: event.nomMagasin,
      adress: event.adress,
      ville: event.ville,
      email: event.magasinEmail,
      fixe: event.fixe,
      type: "principal",
    };

    axios
      .post("http://localhost:3200/api/add_super_admin", body)
      .then((result) => {
        if (result.data.message === "0") {
          seterrMsg("You have an account");
        } else if (result.data.message === "2") {
          seterrMsg("You have an magasin");
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="app-container app-theme-white body-tabs-shadow">
      <div className="app-container">
        <div className="h-100">
          <div className="h-100 no-gutters row">
            <div className="h-100 d-md-flex d-sm-block bg-white justify-content-center align-items-center col-md-12 col-lg-7">
              <div className="mx-auto app-login-box col-sm-12 col-md-10 col-lg-9">
                <div className="app-logo" />
                <h4>
                  <div>Welcome,</div>
                  <span>
                    It only takes a{" "}
                    <span className="text-success">few seconds</span> to create
                    your account
                  </span>
                </h4>
                <div>
                  <form
                    name="formState"
                    noValidate
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="form-row">
                      <div className="col-md-6">
                        <div className="position-relative form-group">
                          <label htmlFor="exampleemail">
                            <span className="text-danger">*</span> Nom
                          </label>
                          <input
                            {...register("nom_utilisateur")}
                            id="nom_utilisateura"
                            placeholder="nom here..."
                            type="text"
                            className="form-control"
                          />
                          <span className="text-danger">
                            {errors.nom_utilisateur?.message}
                          </span>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="position-relative form-group">
                          <label htmlFor="exampleemail">
                            <span className="text-danger">*</span> Prenom
                          </label>
                          <input
                            {...register("prenom_utilisateur")}
                            id="prenom_utilisateurv"
                            placeholder="prenom here..."
                            type="text"
                            className="form-control"
                          />
                          <span className="text-danger">
                            {errors?.prenom_utilisateur?.message}
                          </span>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="position-relative form-group">
                          <label htmlFor="exampleName">Email</label>
                          <input
                            {...register("email")}
                            id="emailv"
                            placeholder="email here..."
                            type="email"
                            className="form-control"
                            required
                          />
                          <span className="text-danger">
                            {errors?.email?.message}
                          </span>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="position-relative form-group">
                          <label htmlFor="examplePassword">
                            <span className="text-danger">*</span> Password
                          </label>

                          <input
                            {...register("password")}
                            id="passwordv"
                            placeholder="Password here..."
                            type="password"
                            className="form-control"
                            autoComplete="on"
                          />
                          <span className="text-danger">
                            {errors?.password?.message}
                          </span>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="position-relative form-group">
                          <label htmlFor="examplePasswordRep">
                            <span className="text-danger">*</span>
                            Password
                          </label>
                          <input
                            {...register("passwordConfirm")}
                            id="passwordConfirm"
                            placeholder="Password here..."
                            type="password"
                            className="form-control"
                            autoComplete="on"
                          />
                          <span className="text-danger">
                            {errors?.passwordConfirm?.message}
                          </span>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="position-relative form-group">
                          <label htmlFor="examplePasswordRep">
                            <span className="text-danger">*</span> nom magasin
                          </label>
                          <input
                            {...register("nomMagasin")}
                            id="nomMagasinv"
                            placeholder="nom magasin here..."
                            type="text"
                            className="form-control"
                          />
                          <span className="text-danger">
                            {errors?.nomMagasin?.message}
                          </span>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="position-relative form-group">
                          <label htmlFor="examplePasswordRep">
                            <span className="text-danger">*</span> adress
                            magasin
                          </label>
                          <input
                            {...register("adress")}
                            id="adressv"
                            placeholder="adress magasin here..."
                            type="text"
                            className="form-control"
                          />
                          <span className="text-danger">
                            {errors?.adress?.message}
                          </span>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="position-relative form-group">
                          <label htmlFor="examplePasswordRep">
                            <span className="text-danger">*</span> ville magasin
                          </label>
                          <input
                            {...register("ville")}
                            id="villev"
                            placeholder="ville magasin here..."
                            type="text"
                            className="form-control"
                          />
                          <span className="text-danger">
                            {errors?.ville?.message}
                          </span>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="position-relative form-group">
                          <label htmlFor="examplePasswordRep">
                            <span className="text-danger">*</span> email magasin
                          </label>
                          <input
                            {...register("magasinEmail")}
                            id="emailvv"
                            placeholder=" email magasin here..."
                            type="email"
                            className="form-control"
                          />
                          <span className="text-danger">
                            {errors?.email?.message}
                          </span>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="position-relative form-group">
                          <label htmlFor="examplePasswordRep">
                            <span className="text-danger">*</span> fixe magasin
                          </label>
                          <input
                            {...register("fixe")}
                            id="fixev"
                            placeholder="fixe magasin here..."
                            type="text"
                            className="form-control"
                          />
                          <span className="text-danger">
                            {errors?.fixe?.message}
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* <input className="btn btn-primary"  type="submit" /> */}

                    <div className="mt-4 d-flex align-items-center">
                      {errMsg === "" ? (
                        ""
                      ) : (
                        <h5 className="mb-0">
                          <span className="text-danger">{errMsg}</span> ,
                          <Link to={"/"}> Login</Link>
                        </h5>
                      )}

                      <div className="ml-auto">
                        <button
                          className="btn btn-primary"
                          disabled={
                            Object.keys(errors).length === 0 ? false : true
                          }
                          type="button"
                          onClick={() => onSubmit(getValues())}
                        >
                          submit
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="d-lg-flex d-xs-none col-lg-5">
              <div className="slider-light">
                <div className="slick-slider slick-initialized">
                  <div>
                    <div
                      className="position-relative h-100 d-flex justify-content-center align-items-center bg-premium-dark"
                      tabIndex={-1}
                    >
                      <div className="slide-img-bg" />
                      <img
                        src={"assets/logo.jpg"}
                        width={"100%"}
                        height={"100%"}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
