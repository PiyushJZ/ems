import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import Tooltip from "@mui/material/Tooltip";
import { logout } from "../redux/authSlice";
import { clearList } from "../redux/taskListSlice";

export default function ButtonAppBar() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(logout());
    dispatch(clearList());
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Tasks
          </Typography>
          {isLoggedIn ? (
            <Tooltip title="Logout" arrow>
              <Button onClick={handleClick} color="inherit">
                Logout
              </Button>
            </Tooltip>
          ) : (
            ""
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
