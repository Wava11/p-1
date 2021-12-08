import { Alert, Card, Snackbar } from "@mui/material";
import { Component } from "react";
import AuthenticatedAdminView from "../../components/admin/authenticated.view.ts";
import UnauthenticatedAdminView from "../../components/admin/unauthenticated.view";
import commonStyles from '../../styles/common.module.css';
import { authenticateAdmin } from "../../utils/admin.api";

export default class AdminPage extends Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
            hasAuthenticationFailed: false
        };
    }

    render() {
        const { isAuthenticated, hasAuthenticationFailed } = this.state;
        return <Card className={commonStyles.page}>

            {isAuthenticated ?
                <AuthenticatedAdminView /> :
                <UnauthenticatedAdminView authenticate={this.authenticate} />}
            <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={hasAuthenticationFailed} autoHideDuration={2000} onClose={this.hideFailureAlert} >
                <Alert severity="error" >זו לא הסיסמא 🤨</Alert>
            </Snackbar>
        </Card>;
    }

    authenticate = async (password: string) => {
        const isAuthenticated = await authenticateAdmin(password);
        if (!isAuthenticated) {
            this.showFailureAlert();
        }
        this.setState({ isAuthenticated });
    };

    hideFailureAlert = () => {
        this.setState({ hasAuthenticationFailed: false });
    };
    showFailureAlert = () => {
        this.setState({ hasAuthenticationFailed: true });
    };
}
interface Props {

}

interface State {
    isAuthenticated: boolean;
    hasAuthenticationFailed: boolean;
}