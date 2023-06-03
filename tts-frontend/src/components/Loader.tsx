import { useContext } from "react";
import { LoaderContext } from "../context/LoaderContext";
import { Box, LinearProgress } from "@mui/material";

const Loader = () => {
  const { loading } = useContext(LoaderContext);
  if (loading) {
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );
  }
  return (<></>);
};

export default Loader;
