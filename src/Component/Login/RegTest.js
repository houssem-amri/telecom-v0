import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
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
  email: yup
    .string()
    .email("You must enter a valid email")
    .required("You must enter a email"),
  fixe: yup.string().required("You must enter your name"),
  type: yup.string().required("You must enter your name"),
});
const theme = createTheme();

export default function Register() {
  let navigate = useNavigate();
  const { control, formState, handleSubmit, reset } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const { isValid, dirtyFields, errors } = formState;

  const onSubmit = (event) => {
      console.log("eeeeeee_________");
    // event.preventDefault();
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
      email: event.email,
      fixe: event.fixe,
      type: "sous_magasin",
    };
    console.log("eeeerere", body);

    // axios
    //   .post("http://localhost:3200/api/add_super_admin", body)
    //   .then((result) => {
    //     console.log(result.data.message);
    //     navigate("/");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form
            noValidate
            onSubmit={()=>handleSubmit(onSubmit)()}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
              <Controller
                name="nom_utilisateur"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-16"
                    label="Name"
                    autoFocus
                    type="name"
                    error={!!errors.nom_utilisateur}
                    helperText={errors?.nom_utilisateur?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />
                
              </Grid>
              <Grid item xs={12} sm={6}>
              <Controller
                name="prenom_utilisateur"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-16"
                    label="Name"
                    autoFocus
                    type="name"
                    error={!!errors.prenom_utilisateur}
                    helperText={errors?.prenom_utilisateur?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />
               
              </Grid>
              <Grid item xs={12}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-16"
                    label="Name"
                    autoFocus
                    type="name"
                    error={!!errors.email}
                    helperText={errors?.email?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />
               
              </Grid>
              <Grid item xs={12}>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-16"
                    label="Name"
                    autoFocus
                    type="name"
                    error={!!errors.password}
                    helperText={errors?.password?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />
                
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
