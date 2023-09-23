import {
  Avatar,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import useOrdersById from "../hooks/useOrdersById";
import isAuth from "../services/authGuard";
import { updateUser } from "../services/userService";

export const Profile = () => {
  const { id } = useParams();
  if (!isAuth(id)) {
    return <Navigate to={"/notfound"} />;
  }
  const user = useSelector(state => state.user.currentUser);
  const [name, setName] = useState(user.name);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { data, isLoading, error } = useOrdersById(id);

  const dispatch = useDispatch();
  const handleNameChange = async () => {
    try {
      const updates = {
        name: name,
      };
      await updateUser(dispatch, { user, updates });
    } catch (error) {
      console.error("Error updating name:", error);
    }
  };

  const handlePasswordChange = async () => {
    try {
      const updates = {
        password: password,
        newPassword: newPassword,
      };
      await updateUser(dispatch, { user, updates });
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  if (error) return <p> {error.message} </p>;
  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>Orders not found.</p>;

  const addresses = [];

  data.forEach(order => {
    let addressFound = addresses.find(address => {
      return (
        address.country === order.shipping.address.country &&
        address.city === order.shipping.address.city &&
        address.line1 === order.shipping.address.line1
      );
    });

    if (!addressFound) {
      addresses.push({
        country: order.shipping.address.country,
        city: order.shipping.address.city,
        line1: order.shipping.address.line1,
      });
    }
  });

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} md={4}>
        <Paper
          elevation={3}
          sx={{
            p: 2,
            height: {
              xs: "auto",
              md: "100vh",
            },
          }}
        >
          <Avatar
            alt={user.name}
            src={user.profileImage}
            sx={{ width: 100, height: 100, mx: "auto", my: 2 }}
          />

          <Typography variant="h6" align="center">
            {user.name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" align="center">
            {user.email}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6">Shipping Addresses:</Typography>
          {addresses.map((address, index) => (
            <List key={index} sx={{ pl: 2 }}>
              <ListItem>
                <ListItemText
                  primary={address.line1}
                  secondary={`${address.city}, ${address.country}`}
                />
              </ListItem>
              <Divider />
            </List>
          ))}
        </Paper>
      </Grid>

      <Grid item xs={12} md={8}>
        <Paper elevation={3} sx={{ p: 2, m: 3 }}>
          <Typography variant="h5" align="center" mt={2} mb={2}>
            Edit User Profile
          </Typography>

          {error && <Typography color="error">{error.message}</Typography>}
          {isLoading && <Typography>Loading...</Typography>}

          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <Button variant="contained" onClick={handleNameChange} sx={{ mt: 2 }}>
            Change Name
          </Button>

          <TextField
            label="Current Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={e => setPassword(e.target.value)}
            sx={{ mt: 2 }}
          />
          <TextField
            label="New Password"
            type="password"
            variant="outlined"
            fullWidth
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            sx={{ mt: 2 }}
          />
          <Button
            variant="contained"
            onClick={handlePasswordChange}
            sx={{ mt: 2 }}
          >
            Change Password
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};
