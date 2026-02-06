import React from "react";
import CheckoutPage from "./Checkout";
import getAuth from "@/Hooks/getAuth";

const Page = async () => {
  const auth = await getAuth();

  return (
    <CheckoutPage data={{
        session_id: auth && auth.session_id ? auth.session_id : null,
        user: auth && auth.user ? auth.user : null,
      }} />
  );
};

export default Page;
