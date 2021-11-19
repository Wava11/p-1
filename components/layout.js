import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import EventIcon from '@mui/icons-material/Event';
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';

import { useRouter } from "next/router";
import { useState } from "react";

export default function Layout({ children }) {
    const router = useRouter();
    const [value, setValue] = useState();
    return <div>
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

const views = [
    { label: "התחברות", icon: <LoginIcon />, route: "/login" },
    { label: "העדפות", icon: <SettingsAccessibilityIcon />, route: "/preferences" },
    { label: "שיבוצים", icon: <EventIcon />, route: "/schedule" },
];