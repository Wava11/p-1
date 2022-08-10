import { createStyles } from "@mui/styles";
import { Theme } from '@mui/material';

export const styles = (theme: Theme) => createStyles({
    root: {
        height: '100%',
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