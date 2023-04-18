import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

function Login() {
  return (
    <>
      <Box
        sx={{ bgcolor: "#a5a7a8", margin: "1rem", padding: "1rem" }}
        className="box"
      >
        <Grid
          container
          direction="column"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item>
            <Typography variant="h5" sx={{ color: "#56208c" }}>
              Login
            </Typography>
          </Grid>
          <Grid item>
            <TextField id="outlined-search" label="Email" type="search" />
          </Grid>
          <Grid item>
            <TextField id="outlined-search" label="Password" type="password" />
          </Grid>
          <Grid item>
            <Button variant="contained">Login</Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Login;
