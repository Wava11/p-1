import LoginIcon from '@mui/icons-material/Login';
import { Card, FormControl, IconButton, MenuItem, Select } from '@mui/material';
import Link from 'next/link';
import React, { Component } from 'react';
import styles from '../../styles/Login.module.css'
import { getAllTeams } from '../../utils/login.api';

export default class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {
        const allTeams = await getAllTeams();
        this.setState({ allTeams });
    }
    render() {
        const { setUser } = this.props;
        const { allTeams, selectedTeam, selectedUser } = this.state;
        if (allTeams) {
            return <Card className={styles.root}>
                <FormControl>
                    <Select
                        displayEmpty
                        value={selectedTeam}
                        onChange={e => this.setState({ selectedTeam: e.target.value })}
                        renderValue={selected =>
                            selected ? selected.name : <em> היי! אני מצוות...</em>
                        }
                    >
                        {allTeams.map((team) => <MenuItem key={team._id} value={team}>{team.name}</MenuItem>)}
                    </Select>
                    <Select
                        displayEmpty
                        disabled={selectedTeam==undefined}
                        value={selectedUser}
                        onChange={e => this.setState({ selectedUser: e.target.value })}
                        renderValue={selected =>
                            selected ? selected.name : <em> ושמי...</em>
                        }
                    >
                        {selectedTeam?.members?.map?.((user) => <MenuItem key={user._id} value={user}>{user.name}</MenuItem>)}
                    </Select>
                </FormControl>

                <Link
                    href="/preferences">
                    <IconButton disabled={selectedUser==undefined} style={{width:"50px"}} onClick={this.login(setUser)}>
                        <LoginIcon fontSize="large" />
                    </IconButton>
                </Link>
            </Card >;
        } else {
            return <div>loading</div>;
        }
    }

    login = async () => {
        this.props.setUser(this.state.selectedUser);
    };

};

