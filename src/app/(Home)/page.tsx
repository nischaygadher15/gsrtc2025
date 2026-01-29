import { getAuth } from "@/lib/auth/getAuth";
import Home from "./Home";
import { redirect } from "next/navigation";

const Page = async () => {
  return <Home />;
};

export default Page;
