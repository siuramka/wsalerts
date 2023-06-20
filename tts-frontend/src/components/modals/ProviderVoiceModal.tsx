import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddIcon from '@mui/icons-material/Add';
import { selectedProviderProps } from '../../types/models/provider/props/selectedProviderProps';
import { Checkbox, Chip, FormControlLabel, Stack, TextField } from '@mui/material';
import { useContext, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { NotificationContext } from '../../context/NotificationContext';
import axios, {  } from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { LoaderContext } from '../../context/LoaderContext';

type ProviderVoiceFormData = {
  apiVoiceName: string
  displayName: string
  selectedVoice: boolean
}

interface PostProviderVoice extends ProviderVoiceFormData {
  providerName: string,
}


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50vh',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  pb: 10
};
//doing params passing 
export default function ProviderVoiceModal({ selectedProviderState, selectedProviderSetState, updateVoices }: selectedProviderProps): JSX.Element {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const { success, error } = useContext(NotificationContext);
  const { loading, setLoaderHandler } = useContext(LoaderContext);
  const handleClose = () => setOpen(false);
  const { control, handleSubmit } = useForm<ProviderVoiceFormData>({
    reValidateMode: "onBlur"
  });
  const { user } = useContext(AuthContext);

  const postVoices = (body: PostProviderVoice) => {
    body.providerName = selectedProviderState!.name
    const headers = { Authorization: user?.token };
    return axios.post(`/api/voice/provider`, { ...body }, { headers });
  };

  const onSubmit: SubmitHandler<ProviderVoiceFormData> = data => {
    setLoaderHandler(true);
    const body: PostProviderVoice = {
      providerName: '',
      ...data
    }
    postVoices(body)
    .then((data) => {
      success("Added voice!")
    })
    .catch((data) => { // how to type this?
      error("Failed to add voice!");
    })
    .finally(() => {
      setLoaderHandler(false);
      updateVoices();
    })
  } 

  return (
    <>
      <Button variant="outlined" onClick={handleOpen} startIcon={<AddIcon />}>Add</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" sx={style} onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ pb: 6, pt: 2, display: "flex", justifyContent: "space-between" }}>
            <Box >
              <Chip label={selectedProviderState?.name} color="primary" />
            </Box>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add a Voice for the Provider
            </Typography>
          </Box>
          <Box>
            <Stack spacing={2}>
              <div>
                <Controller
                  control={control}
                  name="displayName"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      defaultValue="BigChungusVoice"
                      sx={{ width: '100%' }}
                      fullWidth
                      id="outlined-size-normal"
                      inputProps={{ maxLength: 100 }}
                      label="Display name"
                    />
                  )}
                />
              </div>
              <div>
                <Controller
                  control={control}
                  name="apiVoiceName"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      defaultValue="big-chungus-voicev2"
                      sx={{ width: '100%' }}
                      fullWidth
                      id="outlined-size-normal"
                      inputProps={{ maxLength: 100 }}
                      label="API Voice Name"
                    />
                  )}
                />
              </div>
              <div>
                <Box sx={{ pt: 4, display: "flex", justifyContent: "space-between" }}>
                  <Controller
                    control={control}
                    name="selectedVoice"
                    defaultValue={true}
                    render={({ field: { value, onChange, ...field } }) => (
                      <FormControlLabel
                        control={
                          <Checkbox onChange={onChange} checked={value} {...field} />
                        }
                        label="Enable voice"
                      />
                    )}
                  />
                  <Button variant="contained" type="submit">Add</Button>
                </Box>
              </div>
            </Stack>
          </Box>
        </Box>
      </Modal>
    </>
  );
}