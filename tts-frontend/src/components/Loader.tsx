import { useContext } from "react";
import { LoaderContext } from "../context/LoaderContext";
import { Box, LinearProgress } from "@mui/material";

const Loader = () => {
  const { loading } = useContext(LoaderContext);
  if (loading) {
    return (
      <Box sx={{ width: "100%", position:"absolute" }}>
        <LinearProgress />
      </Box>
    );
  } else {
    return (<></>);
  }
};

export default Loader;
