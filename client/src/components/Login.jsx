import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../redux/authSlice";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      if (formData.email !== "" && formData.password !== "") {
        const response = await axios.post(
          "http://localhost:3001/api/auth/login",
          formData
        );
        const data = {
          name: response.data.user.name,
          email: response.data.user.email,
          token: response.data.token,
        };
        dispatch(login(data));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Box sx={{ bgcolor: "#a5a7a8", m: 1, p: 1 }} className="box">
        <Grid
          container
          direction="column"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item sx={{ m: 1 }}>
            <Typography variant="h5" sx={{ color: "#56208c" }}>
              Login
            </Typography>
          </Grid>
          <Grid item sx={{ m: 1 }}>
            <TextField
              id="outlined-search"
              color="secondary"
              helperText="Please enter your email"
              label="Email"
              type="search"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </Grid>
          <Grid item sx={{ m: 1 }}>
            <TextField
              id="outlined-search"
              color="secondary"
              helperText="Please enter your password"
              label="Password"
              type="password"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </Grid>
          <Grid item sx={{ m: 1 }}>
            <Tooltip title="Login">
              <Button onClick={handleLogin} variant="contained">
                Login
              </Button>
            </Tooltip>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Login;
