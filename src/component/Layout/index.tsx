import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Link, useNavigate } from 'react-router-dom';

const drawerWidth = 240;

export default function ClippedDrawer(props:any) {

    const {children}=props
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Clipped drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
      
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' ,backgroundColor:"#1976d2", color: "#fff" },
        }}
      >
        <Toolbar />
       
        <Box sx={{ overflow: 'auto',  }}>
          <List>
              <ListItem  disablePadding>
                <ListItemButton component={Link} to="/">
                  <ListItemIcon>
                  <InboxIcon />
                  Calendar
                  </ListItemIcon>
                  <ListItemText/>
                </ListItemButton>
              </ListItem>
          </List>
          <List>
              <ListItem  disablePadding>
                <ListItemButton component={Link} to="/client">
                  <ListItemIcon>
                  <MailIcon />
                  Client
                  </ListItemIcon>
                  <ListItemText/>
                </ListItemButton>
              </ListItem>
           
          </List>
          <List>
              <ListItem  disablePadding>
                <ListItemButton component={Link} to="/client-events">
                  <ListItemIcon>
                  <MailIcon />
                  Event List
                  </ListItemIcon>
                  <ListItemText/>
                </ListItemButton>
              </ListItem>
           
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
}