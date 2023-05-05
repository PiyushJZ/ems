import { useSelector } from "react-redux";
import AppLayout from "./layout";

const App = () => {
  const darkMode = useSelector((x) => x.app.darkMode);
  return (
    <div data-theme={`${darkMode ? "dark" : "light"}`}>
      <AppLayout />
    </div>
  );
};

export default App;
