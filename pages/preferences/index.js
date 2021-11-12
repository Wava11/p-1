import AddCircleIcon from '@mui/icons-material/AddCircle';
import SendIcon from '@mui/icons-material/Send';
import { Card, Divider, IconButton } from '@mui/material';
import React, { Component } from 'react';
import { removeElement, updateElement } from '../../utils/array.utils';
import { submitPreferences } from './api';
import { PreferenceView } from './components/preference';


export default class PreferencesPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            preferences: []
        };
    }

    render() {
        const { preferences } = this.state;
        return <Card style={{ margin: "15px", padding: "10px" }}>
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
            </div>
        </Card>;
    }

    addNewPreference = () => {
        this.setState(({ preferences }) => ({ preferences: [...preferences, undefined] }));
    };

    submitPreferences = () => {
        const preferences = this.state.preferences.filter(p => p !== undefined);
        return submitPreferences(preferences);
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