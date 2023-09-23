import Grid from "@mui/material/Grid";
import React from "react";
import { categories } from "../data/categories";
import { Categorie } from "./Categorie";



export const CategoriesGrid = () => {
  
  return (
    <Grid container justifyContent="center" spacing={0.2} sx={{ p: 0.2 }}>
      {categories.map(categorie => (
        <Grid item xs={6} sm={3} key={categorie._id}>
          <Categorie categorie={categorie} />
        </Grid>
      ))}
    </Grid>
  );
};
