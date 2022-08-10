import { createStyles } from "@mui/styles";
import { Theme } from '@mui/material';

export const styles = (theme: Theme) => createStyles({
    root: {
        display: 'flex',
        height: '100vh',
        width: '100vw',
    },

    main: {
        flexGrow: 9,
        padding: '2%',
    },

    sideMenu: {
        flexGrow: 1,
        height: '100%'
    },

    avatar: {
        display: 'flex',
        alignItems: 'center',
        padding: '5px'
    },

    username: {
        paddingRight: '5px'
    }
});