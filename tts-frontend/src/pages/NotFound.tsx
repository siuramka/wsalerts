import { Alert, Box, Typography } from "@mui/material";

const NotFound = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "absolute",
        width: "100%",
        height: "100%"
      }}
    >
        <Alert variant="outlined" severity="info">
            Not Found 404
        </Alert>    

    </Box>
  );
};

export default NotFound;