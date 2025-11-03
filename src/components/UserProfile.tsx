import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import { Avatar, CardContent, Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { LogoutOutlined } from '@mui/icons-material';

export default function UserProfile() {
  return (
    <CardContent>
        <Grid container justifyContent="center" alignItems="center">
            <Grid item>
                <Stack direction="row" spacing={1.25} alignItems="center">
                <Avatar alt="profile user" src={"https://fifaaddict.com/fo3img/players/ogimage/p91158023.jpg?20170901"} sx={{ width: 32, height: 32 }} />
                <Stack>
                    <Typography variant="h6">John Doe</Typography>
                    <Typography variant="body2" color="text.secondary">
                    UI/UX Designer
                    </Typography>
                </Stack>
                </Stack>
            </Grid>
        </Grid>
    </CardContent>
  );
}
