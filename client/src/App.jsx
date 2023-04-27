import { useSelector } from "react-redux";
import { Navbar } from "./components";
import AppLayout from "./layout";

const App = () => {
  const darkMode = useSelector((x) => x.app.darkMode);
  return (
    <div data-theme={`${darkMode ? "dark" : "cupcake"}`}>
      <Navbar />
      <AppLayout />
    </div>
  );
};

export default App;
