import { FormControl, FormHelperText, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { LoaderContext } from "../../context/LoaderContext";
import { VoiceRespose } from "../../types/models/VoiceResponse";
import { AuthContext } from "../../context/AuthContext";
import { ProviderResponse } from "../../types/models/provider/ProvidersRespone";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const TtsSettings = () => {

  const { user } = useContext(AuthContext);
  const [providers, setProviders] = useState<ProviderResponse[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<ProviderResponse>();
  const { loading, setLoaderHandler } = useContext(LoaderContext);
  const headers = { Authorization: user?.token };
  const [voices, setVoices] = useState<VoiceRespose[]>([]);
  const [select, setSelect] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setSelect(event.target.value);
  };

  const getSelectedProvider = () => {
    return axios.get<ProviderResponse>(`/api/provider/selected`, { headers });
  }

  const getProviders = () => {
    return axios.get<ProviderResponse[]>(`/api/provider`, { headers });
  };

  const getVoices = () => {
    return axios.get<VoiceRespose[]>(`/api/voice/provider/${selectedProvider?.name}`, { headers });

  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "Voice ID", width: 70 },
    { field: "displayName", headerName: "Display Name" },
    { field: "name", headerName: "API Name" },
    {
      field: "selected",
      type: "boolean",
      headerName: "Selected",
    },
  ];

  useEffect(() => {
    setLoaderHandler(true);
    getSelectedProvider()
      .then((selectedProviderData) => {
        setSelectedProvider(selectedProviderData.data);
        setSelect(selectedProviderData.data.id.toString());

        getProviders().then((providersData) => {
          setProviders(providersData.data);
        })
      })


  }, []);
  
  useEffect(() => {
    getVoices().then((voicesData) => {
      setVoices(voicesData.data);

      setLoaderHandler(false);
    })
  }, [selectedProvider])

  return (
    <>
      {loading ? <></> :
        <>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select
              value={select}
              onChange={handleChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              {
                providers.map((provider) =>
                  <MenuItem value={provider.id.toString()}>{provider.name}</MenuItem>
                )
              }
            </Select>
          </FormControl>
          <div style={{ height: "50vh", width: "100%" }}>
            <DataGrid rows={voices} columns={columns} />
          </div>
        </>

      }

    </>
  );
}

export default TtsSettings;