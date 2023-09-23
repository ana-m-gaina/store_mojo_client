import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React from "react";

export const OrderCard = ({ order }) => {
  return (
    
    <Paper elevation={3} sx={{ p: 2, marginBottom: 2 }}>
      <Typography variant="h6">Order No. {order._id}</Typography>
      <Divider />

      {/* Order Products */}
      <Typography variant="subtitle1" mt={2}>
        Ordered Products: {order.products.length}
      </Typography>

      {/* Order Totals */}
      <Typography variant="subtitle1" mt={2}>
        Order Total:{" "}
        {order.total.toLocaleString("en-US", {
          style: "currency",
          currency: "EUR",
        })}
      </Typography>

      {/* Order Status */}
      <Typography variant="subtitle1" mt={2}>
        Order Status:
      </Typography>
      <Typography variant="body1">{`Delivery Status: ${order.delivery_status}`}</Typography>
    </Paper>
  );
};
