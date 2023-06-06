import {
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { Link } from "react-router-dom";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import StoreIcon from "@mui/icons-material/Store";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const Sidebar = () => {
  const { setUserSignout } = useContext(AuthContext);

  const SignUserOut = () => {
    setUserSignout()
  }

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
      <Toolbar>
        Hey <Button onClick={SignUserOut}>Logout</Button>
      </Toolbar>
      <List>
        <ListItemButton key={0} component={Link} to="/providers">
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
        </ListItemButton>
        <ListItemButton key={2} component={Link} to="/settings/tts">
          <ListItemIcon>
            <RecordVoiceOverIcon />
          </ListItemIcon>
          <ListItemText primary="Settings - TTS" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;
