import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

function Login() {
  return (
    <>
      <Box
        sx={{ bgcolor: '#a5a7a8', m: 1, p: 1 }}
        className='box'
      >
        <Grid
          container
          direction='column'
          justifyContent='space-between'
          alignItems='center'
        >
          <Grid
            item
            sx={{ m: 1 }}
          >
            <Typography
              variant='h5'
              sx={{ color: '#56208c' }}
            >
              Login
            </Typography>
          </Grid>
          <Grid
            item
            sx={{ m: 1 }}
          >
            <TextField
              id='outlined-search'
              label='Email'
              type='search'
            />
          </Grid>
          <Grid
            item
            sx={{ m: 1 }}
          >
            <TextField
              id='outlined-search'
              label='Password'
              type='password'
            />
          </Grid>
          <Grid
            item
            sx={{ m: 1 }}
          >
            <Button variant='contained'>Login</Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Login;
