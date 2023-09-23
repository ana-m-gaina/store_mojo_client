import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import React from "react";

export const CheckboxFilter = ({ name, choices, filters, handleClick }) => {
  return (
    <Box>
      <Typography variant="h6" sx={{ pt: 2 }}>
        {name.toUpperCase()}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {choices &&
          choices.map(choice => (
            <FormControlLabel
              name={name}
              label={choice}
              value={choice}
              key={`item-${choice}`}
              control={<Checkbox color="secondary" />}
              onChange={e => handleClick(e, name)}
              checked={
               filters[name].includes(choice)
              }
            />
          ))}
      </Box>
    </Box>
  );
};
