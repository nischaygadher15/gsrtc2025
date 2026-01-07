import BusListPage from "./BustListPage";

const Page = async () => {
  await new Promise((res) => setTimeout(res, 1000));

  return <BusListPage />;
};

export default Page;
