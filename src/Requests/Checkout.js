import React from 'react'
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import { baseLink } from '../link';
// import STRIPE_PUBLISHABLE from './constants/stripe';
// import PAYMENT_SERVER_URL from './constants/server';

const CURRENCY = 'USD';

const fromEuroToCent = amount => amount * 100;

const successPayment = data => {
  alert('Payment Successful');
};

const errorPayment = data => {
  alert('Payment Successful!');
  window.location.reload()
};

const onToken = (amount, description, request_id) => token =>
  axios.post(`${baseLink()}/api/v1/requests/${request_id}/charge`,
    {
      description,
      source: token.id,
      currency: CURRENCY,
      amount: fromEuroToCent(amount)
    })
    .then(successPayment)
    .catch(errorPayment);

const Checkout = ({ name, description, amount, request_id }) =>
  <StripeCheckout
    name={name}
    description={description}
    amount={fromEuroToCent(amount)}
    token={onToken(amount, description, request_id)}
    currency={CURRENCY}
    stripeKey={'pk_test_WMQh4sHzhrYcT51xC6PHhqCS'}
  />

export default Checkout;
