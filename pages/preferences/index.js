import AddCircleIcon from '@mui/icons-material/AddCircle';
import SendIcon from '@mui/icons-material/Send';
import TtlIcon from '@mui/icons-material/TimeToLeave';
import { Card, Divider, IconButton } from '@mui/material';
import React, { Component } from 'react';
import { removeElement, updateElement } from '../../utils/array.utils';
import { updateUserPreferences, getUserPreferences } from '../../utils/preference.api';
import { PreferenceView } from '../../components/preference';
import styles from '../../styles/Preferences.module.css'

export default class PreferencesPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "matan",
            preferences: []
        };
    }

    async componentDidMount() {
        const preferences = await getUserPreferences(this.state.username);
        this.setState({ preferences });
    }

    render() {
        const { preferences } = this.state;
        return <Card className={styles.padded}>
            {preferences.map((preference, index) =>
                <div>
                    <PreferenceView
                        preference={preference}
                        onSetComment={this.setCommentOf(index)}
                        onSetDay={this.setDayOf(index)}
                        onSetPriority={this.setPriorityOf(index)}
                        onRemove={this.removePreference(index)}
                    />
                    <Divider />
                </div>
            )}
            <div>
                <IconButton disabled={preferences.filter(p => p?.day === undefined).length > 0} onClick={this.addNewPreference}>
                    <AddCircleIcon />
                </IconButton>
                <IconButton disabled={preferences.filter(p => p !== undefined).length == 0} onClick={this.submitPreferences}>
                    <SendIcon />
                </IconButton>
                <IconButton onClick={this.notify}>
                    <TtlIcon />
                </IconButton>
            </div>
        </Card>;
    }

    addNewPreference = () => {
        this.setState(({ preferences }) => ({ preferences: [...preferences, undefined] }));
    };

    submitPreferences = () => {
        const preferences = this.state.preferences.filter(p => p !== undefined);
        return updateUserPreferences(this.state.username, preferences);
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

    removePreference = (index) => () =>
        this.setState(({ preferences }) => ({ preferences: removeElement(index, preferences) }));

    setCommentOf = (index) =>
        (comment) =>
            this.setState(({ preferences }) => ({ preferences: updateElement(index, "comments", comment, preferences) }));
    setDayOf = (index) =>
        (day) =>
            this.setState(({ preferences }) => ({ preferences: updateElement(index, "day", day, preferences) }));
    setPriorityOf = (index) =>
        (priority) =>
            this.setState(({ preferences }) => ({ preferences: updateElement(index, "priority", priority, preferences) }));
};