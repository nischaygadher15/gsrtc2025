import getAuth from "@/Hooks/getAuth";
import Home from "./Home";

const Page = async () => {
  const auth = await getAuth();

  return (
    <Home
      data={{
        session_id: auth && auth.session_id ? auth.session_id : null,
        user: auth && auth.user ? auth.user : null,
      }}
    />
  );
};

export default Page;
