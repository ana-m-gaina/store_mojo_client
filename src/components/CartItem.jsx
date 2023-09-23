import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import React from "react";
import { useDispatch } from "react-redux";
import { removeProduct } from "../features/cartSlice";
import { baseURL } from "../services/ApiClient";
import { Link } from "react-router-dom";

const Image = styled("img")(({ theme }) => ({
  width: "100%",
}));

export const CartItem = ({ item }) => {
  const { product, selectedSize, selectedColor, quantity } = item;
  const { label, price } = product;

  const matchingVariant = product.variant.find(
    item => item.color === selectedColor
  );

  let img;
  if (matchingVariant) {
    img = matchingVariant.images[0];
  }

  const dispatch = useDispatch();

  return (
    <Box>
      <Grid container sx={{ position: "relative" }}>
        <Grid
          item
          xs={6}
          sm={4}
          component={Link}
          to={`/products/find/${product._id}`}
        >
          <Image src={`${baseURL}/images/${img}`} alt={label} loading="lazy" />
        </Grid>

        <Grid item xs={6} sm={4} sx={{ pl: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {label}
          </Typography>
          <Typography variant="body1">Quantity: {quantity}</Typography>
          <Typography variant="body1">Size: {selectedSize}</Typography>
          <Typography variant="body1">Color: {selectedColor}</Typography>
        </Grid>
        <Grid
          item
          xs={6}
          sm={4}
          sx={{
            display: "flex",
            justifyContent: "end",
            order: { xs: 2, sm: 1 },
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {price} EUR
          </Typography>
        </Grid>
        <Grid
          item
          xs={6}
          sm={12}
          sx={{
            order: { xs: 1, sm: 2 },
          }}
        >
          <Typography
            variant="body2"
            onClick={() => dispatch(removeProduct({ product }))}
          >
            Remove
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
