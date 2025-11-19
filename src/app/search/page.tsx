export const dynamic = "force-dynamic";
export const revalidate = 0;

import BusListPage from "./BustListPage";

const SearchBus = async () => {
  await new Promise((res) => setTimeout(res, 3000));

  return <BusListPage />;
};

export default SearchBus;
