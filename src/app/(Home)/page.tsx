import Home from "./Home";

const Page = async () => {
  await new Promise((res) => setTimeout(res, 700));
  return <Home />;
};

export default Page;
