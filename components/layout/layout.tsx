import EventIcon from '@mui/icons-material/Event';
import LoginIcon from '@mui/icons-material/Login';
import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';
import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import { withStyles, WithStyles } from "@mui/styles";
import { useRouter } from "next/router";
import { FunctionComponent, useState } from "react";
import { styles } from "./styles";

const drawerWidth = '10%';

interface LayoutProps extends WithStyles<typeof styles> {
    user: any;
}

const Layout: FunctionComponent<LayoutProps> = props => {
    const { user, children, classes } = props;

    const router = useRouter();
    const [value, setValue] = useState();
    const views = createViews(user);

    return <Box className={classes.root}>
        <Box className={classes.main}>
            <Toolbar />
            <Divider />
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>

        <Box className={classes.sideMenu}>
            {children}
        </Box>
    </Box>;
}

const createViews = (user) => [
    { label: "התחברות", icon: <LoginIcon />, route: "/login" },
    ...(user ? [{ label: "העדפות", icon: <SettingsAccessibilityIcon />, route: "/preferences" }] : []),
    { label: "שיבוצים", icon: <EventIcon />, route: "/schedule" },
];

export default withStyles(styles)(Layout)