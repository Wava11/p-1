import { Button, Card, TextField } from '@mui/material';
import React, { Component } from 'react';

export default class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { username, passphrase } = this.state;
        return <Card style={{ margin: "15px", padding: "15px", display: "flex", flexDirection: "column", height: "200px", justifyContent: "space-between" }}>
            <TextField
                label="username"
                value={username}
                onChange={e => this.setState({ username: e.target.value })} />
            <TextField
                label="passphrase"
                value={passphrase}
                onChange={e => this.setState({ passphrase: e.target.value })} />
            <Button>Login</Button>
        </Card>;
    }

};