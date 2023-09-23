import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import React from 'react';
import { useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
      navigate(-1);
    };

  return (
    <Container maxWidth="md" style={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h4" color="primary" gutterBottom>
        404 - Not Found
      </Typography>
      <Typography variant="body1" color="textSecondary" sx={{ p: 2 }}>
        The page you are looking for does not exist.
      </Typography>
      <Button variant="contained" color="primary" onClick={handleGoBack}>
        Go Back
      </Button>
    </Container>
  );
}
