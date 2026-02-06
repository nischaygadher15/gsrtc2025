import getAuth from "@/Hooks/getAuth";
import BusListPage from "./BustListPage";

const Page = async () => {
  const auth = await getAuth();

  return (
    <BusListPage data={{
        session_id: auth && auth.session_id ? auth.session_id : null,
        user: auth && auth.user ? auth.user : null,
      }} />
  );
};

export default Page;
