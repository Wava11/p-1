import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import { FormControl, IconButton, MenuItem, Select, TextField } from '@mui/material';
import React, { Component } from 'react';
import styles from '../../styles/Preference.module.css';
import { days } from '../../utils/day';
import { priorities } from '../../utils/priority';
import { dateOfDayInNextWeek } from '../../utils/time';


export class PreferenceView extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { onRemove, onSetComment, onSetDay, onSetPriority, preference, selectableDaysIds } = this.props;
        return <div className={styles.root}>
            {preference.isAvailable ? <EventAvailableIcon color="success" className={styles.icon} /> : <EventBusyIcon color="warning" className={styles.icon} />}
            <div className={styles.inputs}>
                <FormControl >
                    <Select
                        size="small"
                        displayEmpty
                        value={preference.day}
                        className={styles.input}
                        onChange={e => onSetDay(e.target.value)}
                        renderValue={selected =>
                            selected ? selected.name : <em> יום...</em>
                        }
                    >
                        {days.map(day => <MenuItem disabled={!selectableDaysIds.includes(day)} value={day}>{dateOfDayInNextWeek(day).format("DD/MM/YYYY")} {day.name}</MenuItem>)}
                    </Select>
                </FormControl>

                <FormControl >
                    <Select
                        size="small"
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
                        size="small"
                        placeholder="הערות"
                        onChange={e => onSetComment(e.target.value)}
                        className={styles.input}
                    />
                </FormControl>
            </div>
            <IconButton onClick={onRemove} className={styles.icon}>
                <DeleteForeverIcon />
            </IconButton>
        </div >;
    }
}