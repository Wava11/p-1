import { createStyles } from "@mui/styles";
import { Theme } from '@mui/material';

export const styles = (theme: Theme) => createStyles({
    root:{
        display: 'flex',
    },

    main: {
        flexGrow: 1,
    },

    sideMenu: {
        flexGrow: 9, 
        padding: '2%',
    }
});