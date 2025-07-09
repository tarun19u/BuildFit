// Payment.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Box, Typography, Button } from "@mui/material";

const planPrices = {
  Monthly: 1000,
  Quarterly: 2500,
  Annual: 8000,
};

const Payment = () => {
  const { state } = useLocation();
  const { userId, plan, email } = state || {};

  const handlePayment = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/payment/create-checkout-session", {
        userId,
        plan,
        email,
        amount: planPrices[plan] // send amount to backend
      });

      window.location.href = res.data.url;
    } catch (err) {
      console.error("Payment error:", err);
      alert("Unable to process payment");
    }
  };

  return (
    <Box sx={{ textAlign: "center", mt: 10 }}>
      <Typography variant="h4">Confirm Your Plan</Typography>
      <Typography variant="h6" mt={2}>
        {plan} Plan - ₹{planPrices[plan]}
      </Typography>
      <Button
        variant="contained"
        sx={{ mt: 4, px: 4, py: 2 }}
        onClick={handlePayment}
      >
        Proceed to Pay
      </Button>
    </Box>
  );
};

export default Payment;
