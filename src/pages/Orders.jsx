import { Grid } from "@mui/material";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { OrderCard } from "../components/OrderCard";
import useOrdersById from "../hooks/useOrdersById";
import isAuth from "../services/authGuard";

export const Orders = () => {
  const { id } = useParams();
  if (!isAuth(id)) {
    return <Navigate to={"/notfound"} />;
  }
  const user = useSelector(state => state.user.currentUser);
  const { data, isLoading, error } = useOrdersById(id);

  console.log("orders", data);
  console.log("user", user);

  if (error) return <p> {error.message} </p>;
  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>Orders not found.</p>;

  return (
    <>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 600,
          display: "flex",
          justifyContent: "center",
          p: 2,
        }}
      >
        ORDERS
      </Typography>

      <Divider />

      {data.length === 0 ? (
        <Typography variant="h6">No orders available</Typography>
      ) : (
        <Grid container spacing={3} p={3}>
          {data.map(order => (
            <Grid item xs={4} key={order._id}>
              <OrderCard order={order} />
            </Grid>
          ))}
        </Grid>
      )}

      <Divider />
    </>
  );
};
