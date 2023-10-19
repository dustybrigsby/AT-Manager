import React from "react";
import { Typography } from '@mui/material';


function Jumbotron({ children }) {
  return (
    <Typography
      style={{ height: 560, clear: "both", paddingTop: 120, textAlign: "center" }}
    >
      {children}
    </Typography>
  );
}

export default Jumbotron;
