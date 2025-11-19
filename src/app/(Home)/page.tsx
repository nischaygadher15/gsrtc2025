import Home from "./Home";

const HomePage = async () => {
  await new Promise((res) => setTimeout(res, 700));
  return <Home />;
};

export default HomePage;
