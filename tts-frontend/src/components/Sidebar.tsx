import {
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

const Sidebar = () => {
  return (
    <Drawer variant="persistent" anchor="left" open={true}>
      <Toolbar />
      <Divider />
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
      </List>
    </Drawer>
  );
};

export default Sidebar;
