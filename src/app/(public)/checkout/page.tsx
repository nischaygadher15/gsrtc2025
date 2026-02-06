import React from "react";
import CheckoutPage from "./Checkout";
import getAuth from "@/Hooks/getAuth";

const Page = async () => {
  const auth = await getAuth();

  return (
    <CheckoutPage data={{ session_id: auth.session_id, user: auth.user }} />
  );
};

export default Page;
