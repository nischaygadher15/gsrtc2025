import getAuth from "@/Hooks/getAuth";
import BusListPage from "./BustListPage";

const Page = async () => {
  const auth = await getAuth();

  return (
    <BusListPage data={{ session_id: auth.session_id, user: auth.user }} />
  );
};

export default Page;
