import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import * as React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../services/userService";

export default function SignUp() {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setname] = useState("");
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const handleClick = async e => {
    e.preventDefault();
    try {
      const errorMessage = await register(dispatch, { name, email, password });
      setError(errorMessage);
    } catch (error) {
      const errorMessage = "An error occurred during registration.";
      setError(errorMessage);
    }
  };

  console.log(error);

  return (
    <>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="User Name"
                  name="name"
                  autoComplete="name"
                  onChange={e => setname(e.target.value)}
                  sx={{
                    backgroundColor: theme =>
                      alpha(theme.palette.common.white, 0.4),
                    "&:hover": {
                      backgroundColor: theme =>
                        alpha(theme.palette.common.white, 1),
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={e => setemail(e.target.value)}
                  sx={{
                    backgroundColor: theme =>
                      alpha(theme.palette.common.white, 0.4),
                    "&:hover": {
                      backgroundColor: theme =>
                        alpha(theme.palette.common.white, 1),
                    },
                  }}
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
                  autoComplete="new-password"
                  onChange={e => setPassword(e.target.value)}
                  sx={{
                    backgroundColor: theme =>
                      alpha(theme.palette.common.white, 0.4),
                    "&:hover": {
                      backgroundColor: theme =>
                        alpha(theme.palette.common.white, 1),
                    },
                  }}
                />
              </Grid>
              {error && <Typography>{error}</Typography>}
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={handleClick}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>

            <Grid container sx={{ mb: 8 }}>
              <Grid item xs>
                <Link href="/signin" variant="body2" sx={{ color: "black" }}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}
