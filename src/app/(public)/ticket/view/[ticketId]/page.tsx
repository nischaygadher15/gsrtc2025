import React from "react";
import ViewTicket from "./Ticket";
import getAuth from "@/Hooks/getAuth";

const Page = async () => {
  const auth = await getAuth();
  return (
    <ViewTicket
      data={{
        session_id: auth && auth.session_id ? auth.session_id : null,
        user: auth && auth.user ? auth.user : null,
      }}
    />
  );
};

export default Page;
