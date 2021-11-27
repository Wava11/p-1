import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import SendIcon from '@mui/icons-material/Send';
import { Alert, Button, Card, Divider, IconButton, Snackbar, Typography } from '@mui/material';
import Link from 'next/link';
import React, { Component } from 'react';
import { PreferenceView } from '../../components/preference';
import styles from '../../styles/Preferences.module.css';
import { removeElement, updateElement } from '../../utils/array.utils';
import { getUserPreferences, updateUserPreferences } from '../../utils/preference.api';
import { withRouter, } from 'next/router';
import { days } from '../../utils/day';


class PreferencesPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            preferences: [],
            isSuccessAlertOpen: false
        };
    }

    async componentDidMount() {
        const preferences = await getUserPreferences(this.state.username);
        this.setState({ preferences });
    }

    render() {
        const { user } = this.props;
        const { preferences, isSuccessAlertOpen } = this.state;
        const selectedDaysIds = preferences.map(({ day }) => day?._id);
        const unselectedDaysIds = days.filter(day => !selectedDaysIds.includes(day?._id));
        if (!user) {
            return <Link href="/login"><Button>Login</Button></Link>;
        }
        return <>
            <Card className={styles.padded}>
                {preferences.map((preference, index) => <>
                    <div className={styles.preferencesList}>
                        <PreferenceView
                            preference={preference}
                            onSetComment={this.setCommentOf(index)}
                            onSetDay={this.setDayOf(index)}
                            onSetPriority={this.setPriorityOf(index)}
                            onRemove={this.removePreference(index)}
                            selectableDaysIds={unselectedDaysIds}
                        />
                    </div>
                    <Divider />
                </>
                )}
                <div className={styles.actionsArea}>
                    <Button
                        style={{ margin: "10px", padding: "5px" }}
                        variant="outlined"
                        color="success"
                        disabled={preferences.filter(p => p?.day === undefined).length > 0}
                        onClick={this.addNewPreference(true)}>
                        <EventAvailableIcon /> אעדיף את יום
                    </Button>
                    <Button
                        style={{ margin: "10px", padding: "5px" }}
                        variant="outlined"
                        color="warning"
                        disabled={preferences.filter(p => p?.day === undefined).length > 0}
                        onClick={this.addNewPreference(false)}>
                        <EventBusyIcon /> אעדיף שלא ביום
                    </Button>
                    <IconButton className={styles.sendButton} disabled={preferences.length == 0 || preferences.filter(p => p?.day == undefined).length > 0} onClick={this.submitPreferences(user._id)}>
                        <SendIcon />
                    </IconButton>
                </div>
            </Card>
            <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={isSuccessAlertOpen} autoHideDuration={2000} onClose={this.hideSuccessAlert} >
                <Alert severity="success" >ההעדפות שלך נשמרו 😇</Alert>
            </Snackbar>
        </>;
    }



    addNewPreference = (isAvailable) => () => {
        this.setState(({ preferences }) => ({ preferences: [...preferences, { isAvailable }] }));
    };
    removePreference = (index) => () =>
        this.setState(({ preferences }) => ({ preferences: removeElement(index, preferences) }));

    submitPreferences = (userId) => async () => {
        const preferences = this.state.preferences.filter(p => p !== undefined);
        await updateUserPreferences(userId, preferences);
        this.showSuccessAlert();
    };

    notify = async () => {
        if ("Notification" in window) {
            if (Notification.permission == "granted") {
                new Notification("Hello");
            } else {
                const permission = await Notification.requestPermission();
                if (permission == "granted") {
                    new Notification("Thanks!");
                }
            }
        } else {
            alert("Notifications are not enabled by your browser :(");
        }
    };


    setCommentOf = (index) =>
        (comment) =>
            this.setState(({ preferences }) => ({ preferences: updateElement(index, "comments", comment, preferences) }));
    setDayOf = (index) =>
        (day) =>
            this.setState(({ preferences }) => ({ preferences: updateElement(index, "day", day, preferences) }));
    setPriorityOf = (index) =>
        (priority) =>
            this.setState(({ preferences }) => ({ preferences: updateElement(index, "priority", priority, preferences) }));
    hideSuccessAlert = () =>
        this.setState({ isSuccessAlertOpen: false });
    showSuccessAlert = () =>
        this.setState({ isSuccessAlertOpen: true });
}

export default withRouter(PreferencesPage);