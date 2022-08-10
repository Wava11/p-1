import { createStyles } from "@mui/styles";
import { Theme } from '@mui/material';

export const styles = (theme: Theme) => createStyles({
    root: {
        height: '100%',
        position: 'relative',
    },

    avatar: {
        display: 'flex',
        alignItems: 'center',
        padding: '5px',
        bottom: '20px',
        position: 'fixed',
    },

    username: {
        paddingRight: '5px'
    }
});