import { Box } from "@mui/material";
import { withStyles, WithStyles } from "@mui/styles";
import { FunctionComponent } from "react";
import Menu from '../menu/Menu';
import { styles } from "./styles";

interface LayoutProps extends WithStyles<typeof styles> {
    user: any;
}

const Layout: FunctionComponent<LayoutProps> = props => {
    const { user, children, classes } = props;

    return <Box className={classes.root}>
        <Menu className={classes.sideMenu} user={user} />

        <Box className={classes.main}>
            {children}
        </Box>
    </Box>;
}

export default withStyles(styles)(Layout)