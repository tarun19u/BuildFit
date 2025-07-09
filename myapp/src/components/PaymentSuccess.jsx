// PaymentSuccess.jsx
import React from "react";
import { Box, Typography } from "@mui/material";

const PaymentSuccess = () => (
  <Box textAlign="center" mt={10}>
    <Typography variant="h4" color="green">Payment Successful!</Typography>
    <Typography variant="h6" mt={2}>Welcome to BUILDFIT Gym!</Typography>
  </Box>
);

export default PaymentSuccess;
