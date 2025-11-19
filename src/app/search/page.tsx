import BusListPage from "./BustListPage";

const SearchBus = async () => {
  await new Promise((res) => setTimeout(res, 1000));

  return <BusListPage />;
};

export default SearchBus;
