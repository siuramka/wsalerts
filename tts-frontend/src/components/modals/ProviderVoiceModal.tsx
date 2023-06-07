import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddIcon from '@mui/icons-material/Add';
import { ProviderResponse } from '../../types/models/provider/ProvidersRespone';
import { TtsSettingsToProviderVoiceModalProps } from '../../types/models/provider/TtsSettingsToProviderVoiceModalProps';
import { selectedProviderProps } from '../../types/models/provider/props/selectedProviderProps';
import { Checkbox, Chip, FormControlLabel, Stack, TextField } from '@mui/material';
import { useState } from 'react';



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
  pb:10
};
//doing params passing 
export default function ProviderVoiceModal({selectedProviderState, selectedProviderSetState}: selectedProviderProps): JSX.Element {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSelected = () => setSelected(!selected);

  return (
    <>
      <Button variant="outlined" onClick={handleOpen} startIcon={<AddIcon />}>Add</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{pb:6, pt:2,display: "flex", justifyContent: "space-between"}}>
            <Box >
              <Chip label={selectedProviderState?.name} color="primary"  />
            </Box>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Add a Voice for the Provider
              </Typography>
          </Box>
          <Box>
            <Stack spacing={2}>
              <div>
                <TextField sx={{width:'100%'}} label="Display name" id="outlined-size-normal" defaultValue="BigChungusVoice" />
              </div>
              <div>
                <TextField sx={{width:'100%'}} label="API Name" id="outlined-size-normal" defaultValue="big-chungus-voicev2" />
              </div>
              <div>
                <Box sx={{pt: 4, display: "flex", justifyContent: "space-between"}}>
                  <FormControlLabel
                    control={
                      <Checkbox onChange={handleSelected} name="selected" />
                    }
                    label="Enable voice"
                  />
                  <Button variant="contained">Save</Button>
                </Box>
              </div>
            </Stack>
          </Box>
        </Box>
      </Modal>
    </>
  );
}