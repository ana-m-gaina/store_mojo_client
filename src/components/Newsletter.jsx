import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React from "react";

export const Newsletter = () => {
  return (
    <Box
      sx={{
        p: 6,
        alignContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h6"
        color="text.primary"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          paddingBottom: "0",
        }}
      >
        Receive exclusive promotions, private sales and news
      </Typography>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          width: { xs: "90%", sm: "50%", md: "40%", lg: "30%" },
        }}
      >
        <TextField
          id="email"
          label="Email"
          variant="standard"
          sx={{ width: "100%", height: "100%" }}
        />
        <Button
          variant="contained"
          sx={{
            margin: "15px",
            marginBottom: "30px",
            width: "100%",
            height: "100%",
          }}
        >
          <Typography variant="h6" color="white">
            SUBSCRIBE
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};
