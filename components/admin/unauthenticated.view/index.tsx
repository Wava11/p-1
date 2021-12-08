import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { FunctionComponent } from "react";

const UnauthenticatedAdminView: FunctionComponent<Props> = props => {
    const [password, setPassword] = useState("");
    return <div>
        <TextField value={password} onChange={e => setPassword(e.target.value)} />
        <Button onClick={()=>{props.authenticate(password)}}>לכניסה</Button>
    </div>;
};

interface Props {
    authenticate: (password: string) => Promise<void>;
}

export default UnauthenticatedAdminView;