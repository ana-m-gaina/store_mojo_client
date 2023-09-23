import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Typography from "@mui/material/Typography";
import React from "react";
import { useSelector } from "react-redux";
import { CartItem } from "./CartItem";
import { CheckoutButton } from "./CheckoutButton";

const payMethods = [
  {
    img: "/images/cards/cash-on-delivery_en.jpg",
    title: "cash on delivery",
  },
  {
    img: "/images/cards/mastercard.jpg",
    title: "mastercard",
  },
  {
    img: "/images/cards/visa_electron.jpg",
    title: "visa electron",
  },
  {
    img: "/images/cards/visa.jpg",
    title: "visa",
  },
];

export const CartGrid = ({}) => {
  const cartItems = useSelector(state => state.cart.items);
  const quantity = useSelector(state => state.cart.quantity);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <Box maxWidth="lg" sx={{ m: "auto" }}>
      <Grid container sx={{ p: { xs: 2, sm: 5, md: 7 } }}>
        <Grid item xs={12} sm={8} sx={{ pr: { sm: 8 } }}>
          <Typography variant="h6" sx={{ pb: 2 }}>
            Shopping bag ({quantity}){" "}
          </Typography>
          {cartItems.map((item, index) => (
            <Box key={index}>
              <CartItem item={item} key={index} />
              {index !== cartItems.length - 1 && <Divider sx={{ mb: 1 }} />}
            </Box>
          ))}
        </Grid>
        <Grid
          item
          xs={12}
          sm={4}
          sx={{
            position: "sticky",
            top: "0",
            maxHeight: "100vh",
          }}
        >
          <Typography variant="h6" sx={{ pb: 2 }}>
            Summary
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6"> Total </Typography>
            <Typography variant="h6">
              {totalPrice.toLocaleString("en-US", {
                style: "currency",
                currency: "EUR",
              })}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", pb: 4 }}>
            <Typography variant="body2"> Delivery </Typography>
            <Typography variant="body2"> Free </Typography>
          </Box>

          <CheckoutButton cartItems={cartItems} />

          <Typography
            variant="body2"
            sx={{ display: "flex", justifyContent: "center", mb: 2, p: 1 }}
          >
            Taxes included
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <LocalShippingOutlinedIcon fontSize="small" />
            <Typography variant="body2" sx={{ pl: 1 }}>
              Free delivery for orders over 250 EUR.
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <HistoryOutlinedIcon fontSize="small" />
            <Typography variant="body2" sx={{ pl: 1 }}>
              Free returns in 30 days.
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <LockOutlinedIcon fontSize="small" />
            <Typography variant="body2" sx={{ pl: 1 }}>
              Secure payment
            </Typography>
          </Box>

          <Typography variant="subtitle2" sx={{ pt: 2 }}>
            {" "}
            We accept{" "}
          </Typography>

          <ImageList
            sx={{ width: 225, height: 35 }}
            cols={4}
            rowHeight={30}
            gap={8}
          >
            {payMethods.map(item => (
              <ImageListItem key={item.img}>
                <img
                  src={`${item.img}?w=50&h=30&fit=crop&auto=format`}
                  srcSet={`${item.img}?w=50&h=30&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Grid>
      </Grid>
    </Box>
  );
};
