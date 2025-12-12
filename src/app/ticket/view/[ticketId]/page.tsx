import React from "react";
import ViewTicket from "./Ticket";

const Page = async () => {
  await new Promise((res) => setTimeout(res, 1000));
  return <ViewTicket />;
};

export default Page;
