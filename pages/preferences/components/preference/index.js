import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { Component } from 'react';
import { days, priorities } from './preference.types';
import styles from '../../../../styles/Preferences.module.css';

export class PreferenceView extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { onRemove, onSetComment, onSetDay, onSetPriority, preference } = this.props;
        const dayOfWeekLabelId = "day-of-week-label";
        const priorityLabelId = "priority-label";
        return <div style={{ margin: "10px" }}>
            <FormControl>
                <InputLabel id={dayOfWeekLabelId}>Day of week</InputLabel>
                <Select
                    labelId={dayOfWeekLabelId}
                    label="Day of week"
                    value={preference?.day ?? ""}
                    className={styles.input}
                    onChange={e => onSetDay(e.target.value)}
                >
                    {days.map(day => <MenuItem value={day}>{day}</MenuItem>)}
                </Select>
            </FormControl>

            <FormControl>
                <InputLabel id={priorityLabelId}>Priority</InputLabel>
                <Select
                    labelId={priorityLabelId}
                    label="Priority"
                    value={preference?.priority ?? ""}
                    className={styles.input}
                    onChange={e => onSetPriority(e.target.value)}
                >
                    {priorities.map(priority => <MenuItem value={priority}>{priority}</MenuItem>)}
                </Select>
            </FormControl>
            <TextField
                label="Comment"
                onChange={e => onSetComment(e.target.value)}
                className={styles.input}
            />
            <IconButton onClick={onRemove} style={{ margin: "10px" }}>
                <DeleteForeverIcon />
            </IconButton>
        </div >;
    }
}