import Bookings from "./Bookings";
import getAuth from "@/Hooks/getAuth";

const Page = async () => {
  const auth = await getAuth();

  return (
    <Bookings
      data={{
        session_id: auth && auth.session_id ? auth.session_id : null,
        user: auth && auth.user ? auth.user : null,
      }}
    />
  );
};

export default Page;
