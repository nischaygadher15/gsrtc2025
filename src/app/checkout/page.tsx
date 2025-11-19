import React from "react";
import CheckoutPage from "./Checkout";

const CheckOut = async () => {
  await new Promise((res) => setTimeout(res, 700));
  return <CheckoutPage />;
};

export default CheckOut;
