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
import { useDispatch, useSelector } from "react-redux";
import { cartSet } from "../features/cartSlice";
import { store } from "../features/store";
import { cartGet } from "../services/cartService";
import { login } from "../services/userService";

export default function SignIn() {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching } = useSelector(state => state.user);
  const [errormessage, setErrorMessage] = useState("");

  const fetchCartData = async user => {
    try {
      const cartData = await dispatch(cartGet({ user }));
      return cartData;
    } catch (err) {
      setErrorMessage("An error occurred.");
    }
  };

  const handleClick = async e => {
    e.preventDefault();
    try {
      const errorMessage = await login(dispatch, { email, password });
      setErrorMessage(errorMessage);
      const user = store.getState().user.currentUser;
      const cartData = await fetchCartData(user);
      dispatch(cartSet(cartData));
    } catch (err) {
      setErrorMessage("An error occurred.");
    }
  };

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
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
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
            <FormControlLabel
              control={<Checkbox value="remember" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleClick}
              disabled={isFetching}
            >
              Sign In
            </Button>

            {errormessage && <div>{errormessage}</div>}

            <Grid container sx={{ mb: 8 }}>
              <Grid item xs>
                <Link href="#" variant="body2" sx={{ color: "black" }}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2" sx={{ color: "black" }}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}
