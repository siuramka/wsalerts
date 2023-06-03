import { useContext, useEffect, useState } from "react";
import { VoiceRespose } from "../types/models/VoiceResponse";
import axios from "axios";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { AuthContext } from "../context/AuthContext";
import { Box, LinearProgress } from "@mui/material";
import { LoaderContext } from "../context/LoaderContext";

const Voices = () => {
  const [voices, setVoices] = useState<VoiceRespose[]>([]);
  const { user } = useContext(AuthContext);
  const {setLoaderHandler} = useContext(LoaderContext);

  const getVoices = async () => {
    const headers = { Authorization: user?.token };
    const { data } = await axios.get<VoiceRespose[]>(`api/voice`, { headers });
    if (data) {
      setVoices(data);
    }
    setLoaderHandler(false);
  };

  useEffect(() => {
    setLoaderHandler(true);
    getVoices();
  }, []);
  const columns: GridColDef[] = [
    { field: "id", headerName: "Voice ID", width: 70 },
    { field: "displayName", headerName: "Display Name", width: 130 },
    { field: "name", headerName: "API Name", width: 130 },
    {
      field: "selected",
      type: "boolean",
      headerName: "Selected",
      width: 130,
    },
  ];


    return (
      <>
        <div style={{ height: "50vh", width: "100%" }}>
          <DataGrid rows={voices} columns={columns} />
        </div>
      </>
    );
};

export default Voices;