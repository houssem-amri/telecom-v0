import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { addConnectedUser } from "../../redux/action/AuthAction";
import { connect } from "react-redux";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://www.tunisietelecom.tn/Fr">
        Tunisie Télécom
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

const SignInSide = ({addConnectedUser}) => {
  const [errMail, seterrMail] = React.useState("");
  const [errpwd, seterrpwd] = React.useState("");
  let navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
 

    axios
      .post("http://localhost:3200/api/login", {
        email: data.get("email"),
        password: data.get("password"),
      })
      .then((response) => {
        if (response.data.message === "2") {
          seterrpwd("");
          seterrMail("");
          addConnectedUser(response.data.user);
         
          if (response.data.user.Poste === "admin") {
            navigate("/");
          }
          if (response.data.user.Poste === "RDS") {
            setTimeout(() => {
              navigate("/Tableproducts");
            }, 1000);
          }
          if (response.data.user.Poste === "RDA") {
            navigate("/TableCommande");
          }
          if (response.data.user.Poste === "RDV") {
            navigate("/");
          }
        }
        if (response.data.message === "0") {
          seterrMail("Invalid Email");
          seterrpwd("");
        }
        if (response.data.message === "1") {
          seterrpwd("Invalid Password");
          seterrMail("");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <span className="text-danger">{errMail}</span>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <span className="text-danger">{errpwd}</span>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item></Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url('assets/logo.jpg')",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "1100px",
            backgroundPosition: "center",
          }}
        />
      </Grid>
    </ThemeProvider>
  );
};


const mapDispatchToProps = (dispatch) => {
  return {
    addConnectedUser: (user) => {
      dispatch(addConnectedUser(user));
    },
  };
};

export default connect(null,mapDispatchToProps)(SignInSide);
