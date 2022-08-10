import EventIcon from '@mui/icons-material/Event';
import LoginIcon from '@mui/icons-material/Login';
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';
import { Avatar, Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
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

    const changeRoute = (route: string) => {
        router.push(route)
    };

    return <Box className={classes.root}>
        <Box className={classes.sideMenu}>
            <Toolbar />
            <Divider />
            <List>
                {views.map(view => (
                    <ListItem key={view.label} disablePadding>
                        <ListItemButton onClick={() => changeRoute(view.route)}>
                            <ListItemIcon>
                                {view.icon}
                            </ListItemIcon>
                            <ListItemText primary={view.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            <Box className={classes.avatar}>
                <Avatar>
                    {user?.name?.charAt?.(0)}
                </Avatar>
                {user ? <Typography className={classes.username}>{user.name}</Typography> : null}
            </Box>
        </Box>

        <Box className={classes.main}>
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