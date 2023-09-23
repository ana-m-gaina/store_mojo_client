import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cartSet } from "../features/cartSlice";
import { cartGet } from "../services/cartService";

export const CheckoutSuccess = () => {
  const user = useSelector(state => state.user.currentUser);

  const dispatch = useDispatch();
  const [errormessage, setErrorMessage] = useState("");

 useEffect(() => {
   const fetchCartData = async user => {
     try {
       const cartData = await dispatch(cartGet({ user }));
       return cartData;
     } catch (err) {
       setErrorMessage("An error occurred.");
       return null;
     }
   };

   const fetchData = async () => {
     try {
       const cartData = await fetchCartData(user);
       if (cartData) {
         dispatch(cartSet(cartData));
       }
     } catch (err) {
       setErrorMessage("An error occurred.");
     }
   };

   fetchData();
 }, [user, dispatch]);
  
      
    const navigate = useNavigate();
    const handleGoBack = () => {
      navigate('/');
    };

  return (
    <Container maxWidth="md" style={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h4" color="primary" gutterBottom>
        Checkout successful!
      </Typography>
      <Typography variant="body1" color="textSecondary" sx={{ p: 2 }}>
        Thank you for shopping with us. 
      </Typography>
      <Button variant="contained" color="primary" onClick={handleGoBack}>
        Home
      </Button>
    </Container>
  );
}
 