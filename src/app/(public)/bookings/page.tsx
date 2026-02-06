import Bookings from "./Bookings";
import getAuth from "@/Hooks/getAuth";

const Page = async () => {
  const auth = await getAuth();

  return <Bookings data={{ session_id: auth.session_id, user: auth.user }} />;
};

export default Page;
