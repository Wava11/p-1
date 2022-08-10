import { Avatar, Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import { withStyles, WithStyles } from "@mui/styles";
import { useRouter } from "next/router";
import { FunctionComponent } from "react";
import { views } from './consts';
import { styles } from "./styles";


interface MenuProps extends WithStyles<typeof styles> {
    user: any;
    className: string
}

const Menu: FunctionComponent<MenuProps> = props => {
    const { classes, user, className } = props;
    const router = useRouter();

    const changeRoute = (route: string) => {
        router.push(route)
    };

    return (
        <Box className={`${classes.root} ${className}`}>
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
        </Box>)
}

export default withStyles(styles)(Menu);