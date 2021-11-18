import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { FormControl, IconButton, MenuItem, Select, TextField } from '@mui/material';
import React, { Component } from 'react';
import styles from '../../styles/Preferences.module.css';
import { days, priorities } from '../../utils/preference.types';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventBusyIcon from '@mui/icons-material/EventBusy';

export class PreferenceView extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { onRemove, onSetComment, onSetDay, onSetPriority, preference } = this.props;
        return <div style={{ margin: "10px" }}>
            {preference.isRequest ? <EventAvailableIcon color="success"/> : <EventBusyIcon color="warning"/>}
            <FormControl>
                <Select
                    displayEmpty
                    value={preference?.day}
                    className={styles.input}
                    onChange={e => onSetDay(e.target.value)}
                    renderValue={selected =>
                        selected ? selected.name : <em> יום...</em>
                    }
                >
                    {days.map(day => <MenuItem value={day}>{day.name}</MenuItem>)}
                </Select>
            </FormControl>

            <FormControl>
                <Select
                    displayEmpty
                    value={preference?.priority}
                    className={styles.input}
                    onChange={e => onSetPriority(e.target.value)}
                    renderValue={selected =>
                        selected ? selected.name : <em> בעדיפות...</em>
                    }
                >
                    {priorities.map(priority => <MenuItem value={priority}>{priority.name}</MenuItem>)}
                </Select>
            </FormControl>
            <FormControl>
                <TextField
                    label="Comment"
                    onChange={e => onSetComment(e.target.value)}
                    className={styles.input}
                />
            </FormControl>
            <IconButton onClick={onRemove} style={{ margin: "10px" }}>
                <DeleteForeverIcon />
            </IconButton>
        </div >;
    }
}