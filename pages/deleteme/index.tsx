import { Card, Typography } from "@mui/material";
import { Component } from "react";
import { randomElementOf } from "../../utils/array.utils";
interface State {
    note: Note|"-";
}
export default class Notes extends Component<{}, State> {
    constructor(props) {
        super(props);
        this.state = {
            note: randomElementOf(notes)
        };
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({ note: "-" });
            setTimeout(() => {
                this.setState({ note: randomElementOf(notes) });
                
            }, 100);
        }, 1500);
    }
    render() {
        return <Card style={{ width: "100%", height: "100%" }}>
            <Typography align="center" style={{fontSize:"42em"}}>
                {this.state.note}
            </Typography>
        </Card>;
    }
};

const notes = ["A", "B", "C", "D", "E", "F", "G"] as const;
type Note = (typeof notes)[number];