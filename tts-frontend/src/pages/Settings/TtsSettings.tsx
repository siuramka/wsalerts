import { Box, Button, FormControl, FormHelperText, MenuItem, Select, SelectChangeEvent, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { LoaderContext } from "../../context/LoaderContext";
import { VoiceRespose } from "../../types/models/VoiceResponse";
import { AuthContext } from "../../context/AuthContext";
import { ProviderResponse } from "../../types/models/provider/ProvidersRespone";
import { DataGrid, GridCallbackDetails, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import ProviderVoiceModal from "../../components/modals/ProviderVoiceModal";
import { NotificationContext } from "../../context/NotificationContext";

const TtsSettings = () => {

  const { user } = useContext(AuthContext);
  const [editable, setEditable] = useState(false);
  const [deletable, setDeletable] = useState(false);
  const [providers, setProviders] = useState<ProviderResponse[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<ProviderResponse>();
  const { loading, setLoaderHandler } = useContext(LoaderContext);
  const headers = { Authorization: user?.token };
  const [voices, setVoices] = useState<VoiceRespose[]>([]);
  const [select, setSelect] = useState('');
  const [selectedForDeletion, setSelectedForDeletion] = useState<GridRowSelectionModel>()
  const { success, error } = useContext(NotificationContext);


  const handleSave = () => {
    ///
    setEditable(false)
  }

  const removeVoicesFromState = (deleteVoices: GridRowSelectionModel) => {
    const newVoices = voices.filter(x => !deleteVoices.includes(x.id));
    setVoices(newVoices)
  }

  const updateVoices = () => {
    setLoaderHandler(true);
    getVoices().then((voicesData) => {
      setVoices(voicesData.data);
      setLoaderHandler(false);
    })
  }

  const handleEditable = () => {
    if (!deletable) {
      setEditable(!editable) // no need for if check since react won't re render if the same value pass
    }
  }

  const handleDeletable = () => {
    if (!editable) {
      setDeletable(!deletable)
    }
  }

  const handleDeletableConfirm = () => {
    setDeletable(!deletable)
    Promise.all( // doesnt wait for api calls to finish <;o
      selectedForDeletion!.map((voiceId, id) => {
        axios.delete(`/api/voice/${voiceId}`, { headers })
      })
      ).catch(() => {
        error("WHAT DID YOU DO ?")
      })
      .then(() => {
        removeVoicesFromState(selectedForDeletion!)
        success("Deleted voices!")
      })
    // Promise.all(selectedForDeletion?.map((voiceId, id) => axios.delete(`/api/provider/${voiceId}`)))

  }

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

  const handleDeleteSelect = (rowSelectionModel: GridRowSelectionModel, details: GridCallbackDetails) => {
    setSelectedForDeletion(rowSelectionModel)
  }


  const columns: GridColDef[] = [
    { field: "id", headerName: "Voice ID", width: 150, editable: editable },
    { field: "displayName", headerName: "Display Name", width: 250, editable: editable },
    { field: "name", headerName: "API Name", width: 250, editable: editable },
    {
      field: "selected",
      type: "boolean",
      headerName: "Selected",
      width: 150,
      editable: editable
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
      {(loading && providers == null) ? <></> :
        <>
          <Box sx={{ pt: 2 }}>
            <Typography variant="h5" gutterBottom>
              Text-to-Speech Settings
            </Typography>
            <Box sx={{ pb: 2, pt: 1, display: "flex", justifyContent: "space-between" }}>
              <FormControl color="success">
                <FormHelperText sx={{ color: "#fff" }}>Active TTS API</FormHelperText>
                <Select
                  value={select}
                  onChange={handleChange}
                  displayEmpty
                  disabled={!editable}
                >
                  {
                    providers.map((provider) =>
                      <MenuItem value={provider.id.toString()}>{provider.name}</MenuItem>
                    )
                  }
                </Select>
              </FormControl>
              <Stack spacing={2} direction="row" sx={{ p: 2, pr: 0 }}>
                {/* <Button variant="outlined" startIcon={<AddIcon />}>Add</Button> */}
                <ProviderVoiceModal updateVoices={updateVoices} selectedProviderState={selectedProvider} selectedProviderSetState={setSelectedProvider} />
                {
                  editable ?
                    <>
                      <Button color="success" variant="contained" startIcon={<SettingsIcon />} onClick={handleEditable}>Confirm edit</Button>
                    </> :
                    <>
                      <Button variant="contained" startIcon={<SettingsIcon />} onClick={handleEditable}>Edit</Button>
                    </>
                }
                {
                  deletable ?
                    <>
                      <Button color="error" variant="contained" startIcon={<DoneIcon />} onClick={handleDeletableConfirm}>Confirm delete</Button>
                    </> :
                    <>
                      <Button variant="contained" startIcon={<DeleteIcon />} onClick={handleDeletable}>Delete</Button>
                    </>
                }

              </Stack>
            </Box>
            <div style={{ height: "50vh", width: "100%" }}>
              <DataGrid checkboxSelection={deletable} editMode="row" rows={voices} columns={columns}
                onRowSelectionModelChange={handleDeleteSelect}
              />
            </div>

            {/* <Box sx={{ pt:2, display: "flex", justifyContent: "right" }}>
              <Button color="success" variant="outlined" startIcon={<DeleteIcon />} onClick={handleSave}>Save changes</Button>
            </Box> */}
          </Box>

        </>

      }

    </>
  );
}

export default TtsSettings;