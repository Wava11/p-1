import { AppBar, Avatar, BottomNavigation, BottomNavigationAction, Box, Toolbar, Typography } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import EventIcon from '@mui/icons-material/Event';
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';

import { useRouter } from "next/router";
import { useState } from "react";

export default function Layout({ children, user }) {
    const router = useRouter();
    const [value, setValue] = useState();
    const views = createViews(user);
    debugger;

    return <div>
        <AppBar position="static" >
            <Toolbar>
                <Avatar style={{marginLeft:"12px"}}>
                    {user?.name?.charAt?.(0)}
                </Avatar>
                {user ? <Typography style={{ flexGrow: 1 }}>שלום {user.name} 👋 </Typography> : <></>}
            </Toolbar>
        </AppBar>
        {children}
        <BottomNavigation style={{ position: "fixed", bottom: 0, right: 0, left: 0 }} showLabels value={value} onChange={
            (_, newValue) => {
                setValue(newValue);
                router.push(views[newValue].route);
            }
        }>
            {
                views.map(view =>
                    <BottomNavigationAction label={view.label} icon={view.icon}>
                    </BottomNavigationAction>
                )
            }
        </BottomNavigation>

    </div>;
}

const createViews = (user) => [
    { label: "התחברות", icon: <LoginIcon />, route: "/login" },
    ...(user ? [{ label: "העדפות", icon: <SettingsAccessibilityIcon />, route: "/preferences" }] : []),
    { label: "שיבוצים", icon: <EventIcon />, route: "/schedule" },
];