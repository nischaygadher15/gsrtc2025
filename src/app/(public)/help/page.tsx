import getAuth from "@/Hooks/getAuth";
import Help from "./Help";

const page = async () => {
  const auth = await getAuth();
  return <Help data={{ session_id: auth.session_id, user: auth.user }} />;
};

export default page;
