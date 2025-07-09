// routes/payment.js
const express = require('express');
const stripe = require('stripe')('YOUR_SECRET_KEY');
const router = express.Router();

router.post('/create-checkout-session', async (req, res) => {
  const { plan, userId } = req.body;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card', 'google_pay', 'upi'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: plan.name,
          },
          unit_amount: plan.price * 100, // price in cents
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `http://localhost:3000/success?user=${userId}`,
    cancel_url: `http://localhost:3000/cancel`,
  });

  res.send({ url: session.url });
});

module.exports = router;
