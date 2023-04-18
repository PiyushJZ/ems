import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Login from "./components/Login";
import NavBar from "./components/Navbar";
import TaskList from "./components/TaskList";
import CreateTask from "./components/CreateTask"
import "./App.css";

const App = () => {
  // Temp state
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <NavBar />
        <Box
          sx={{ bgcolor: "#daeddf", height: "100%", minHeight: "100vh" }}
          className="box"
        >
          <Typography variant="h2" className="heading">
            Task Mananger
          </Typography>
          {isLoggedIn ? <CreateTask /> : <Login />}
          <TaskList />
        </Box>
      </Container>
    </>
  );
};

export default App;
