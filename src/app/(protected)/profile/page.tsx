import getAuth from "@/Hooks/getAuth";
import Profile from "./Profile";
import BusLoaderProvider from "@/app/loading";

const page = async () => {
  let loading = true;
  const auth = await getAuth(true);
  loading = false;

  if (loading) {
    return <BusLoaderProvider />;
  }

  return <Profile data={{ session_id: auth.session_id, user: auth.user }} />;
};

export default page;
