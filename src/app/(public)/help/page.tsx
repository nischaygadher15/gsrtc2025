import getAuth from "@/Hooks/getAuth";
import Help from "./Help";

const page = async () => {
  const auth = await getAuth();
  return <Help data={{
        session_id: auth && auth.session_id ? auth.session_id : null,
        user: auth && auth.user ? auth.user : null,
      }} />;
};

export default page;
