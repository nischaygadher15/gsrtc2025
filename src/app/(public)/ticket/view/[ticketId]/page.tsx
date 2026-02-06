import React from "react";
import ViewTicket from "./Ticket";
import getAuth from "@/Hooks/getAuth";

const Page = async () => {
  const auth = await getAuth();
  return <ViewTicket data={{ session_id: auth.session_id, user: auth.user }} />;
};

export default Page;
