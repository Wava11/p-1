import { getUser } from "../../../../utils/users.dal";

const users = {};

export default async (req, res) => {
    const { username, passphrase } = req.query;
    console.log(username);
    console.log(passphrase);
    const userFromDb = await getUser(username, passphrase);
    console.log(JSON.stringify(userFromDb));
    if (userFromDb) {
        res.status(200).send();
    } else {
        res.status(401).send();
    }
};
