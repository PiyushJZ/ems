import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography"

function Login() {
  return (
    <>
      <Box sx={{ bgcolor: "#a5a7a8", margin: "1rem", padding: "1rem" }} className="box">
        <Typography variant="h5" sx={{ color: "#56208c"}}>Login</Typography>
      </Box>
    </>
  );
}

export default Login;
