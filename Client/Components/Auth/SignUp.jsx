import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { Link as A, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <A color="inherit" href="#">
        Streamland
      </A>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
      const [firstname, setFirstname] = useState("");
      const [lastname, setLastname] = useState("");
      const [email, setEmailname] = useState("");
      const [password, setPassword] = useState("");
      const [disable, setDisable] = useState(false);
      const navigate = useNavigate();

      const sendData = async () => {
            setDisable(true);
            const response = await fetch("http://localhost:3000/user_auth", {
                        method : "POST",
                        headers : {
                              "Content-Type" : "application/json"
                        },
                        body : JSON.stringify({
                              firstname,
                              lastname,
                              email,
                              password
                        })
            });
            if (response.status == 200) {
                  navigate("/");
            } else {
                  navigate("/login")
            }
      }

      const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      console.log({
            email: data.get('email'),
            password: data.get('password'),
      });
      };

      return (
      <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
            sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
            }}
            >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                  Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                  <TextField
                        autoComplete="given-name"
                        name="firstName"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                  />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <TextField
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        autoComplete="family-name"
                  />
                  </Grid>
                  <Grid item xs={12}>
                  <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        value={email}
                        onChange={(e) => setEmailname(e.target.value)}
                        autoComplete="email"
                  />
                  </Grid>
                  <Grid item xs={12}>
                  <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="new-password"
                  />
                  </Grid>
                  <Grid item xs={12}>
                  <FormControlLabel
                        required
                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                        label="I agree to terms & conditions"
                  />
                  </Grid>
                  </Grid>
                  <Button
                  disabled={disable}
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={sendData}
                  >
                  Sign Up
                  </Button>
                  <Grid container justifyContent="flex-end">
                  <Grid item>
                  <Button  variant="body2">
                        <A to="/login">Already have an account? Sign in</A>
                  </Button>
                  </Grid>
                  </Grid>
            </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
            </Container>
      </ThemeProvider>
      );
}