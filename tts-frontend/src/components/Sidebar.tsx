import {
  Button,
  Chip,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { Link } from "react-router-dom";
import FaceIcon from '@mui/icons-material/Face';
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import LogoutIcon from '@mui/icons-material/Logout';

const Sidebar = () => {
  const { user, setUserSignout } = useContext(AuthContext);

  const SignUserOut = () => {
    setUserSignout();
  };

  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar
        sx={{

          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Chip
        icon={<FaceIcon />} 
  label={user?.username}
  variant="outlined"
/>
        
        <Button variant="outlined" onClick={SignUserOut}>
          <LogoutIcon/>
        </Button>
      </Toolbar>
      <List>
        {/* <ListItemButton key={0} component={Link} to="/providers">
          <ListItemIcon>
            <StoreIcon />
          </ListItemIcon>
          <ListItemText primary="Providers" />
        </ListItemButton>
        <ListItemButton key={1} component={Link} to="/voices">
          <ListItemIcon>
            <RecordVoiceOverIcon />
          </ListItemIcon>
          <ListItemText primary="Voices" />
        </ListItemButton> */}
        <ListItemButton key={2} component={Link} to="/settings/tts">
          <ListItemIcon>
            <RecordVoiceOverIcon />
          </ListItemIcon>
          <ListItemText primary="TTS Settings" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;
