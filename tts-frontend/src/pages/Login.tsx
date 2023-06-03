import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import axios from "axios";

export default function SignInSide() {
    
  const handleLogin = () => {
    axios.get(`api/accounts/login`)
    .then(res => {
      window.location.assign(res.data.uri);
    })
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid item xs={12} sm={12} md={12} component={Paper} elevation={1} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "75vh", // Ensure the container fills the viewport height
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            sx={{ mt: 1 }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogin}
            >
              Login with Discord
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
