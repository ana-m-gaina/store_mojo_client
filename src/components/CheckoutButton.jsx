import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { baseURL } from "../services/ApiClient";


export const CheckoutButton = ({ cartItems }) => {
  const user = useSelector(state => state.user.currentUser);
  const [showAlert, setShowAlert] = useState(false);

  const handleCheckout = e => {
    e.preventDefault();
    if (!user) {
      setShowAlert(true);
      return;
    }

    axios
      .post(`${baseURL}/checkout/create-checkout-session`, {
        cartItems,
        userId: user._id,
      })
      .then(res => {
        console.log("res", res);
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch(err => console.log(err.message));
  };
  return (
    <>
      {showAlert && (
        <Alert severity="info">Please log in to finish checkout!</Alert>
      )}

      <Button
        type="submit"
        id="checkout-button"
        variant="contained"
        sx={{ width: "100%" }}
        onClick={e => handleCheckout(e)}
      >
        CHECKOUT NOW
      </Button>
    </>
  );
};
