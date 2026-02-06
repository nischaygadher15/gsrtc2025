import getAuth from "@/Hooks/getAuth";
import Home from "./Home";

const Page = async () => {
  const auth = await getAuth();

  return <Home data={{ session_id: auth.session_id, user: auth.user }} />;
};

export default Page;
