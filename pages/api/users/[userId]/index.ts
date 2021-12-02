import { getUser } from "../../../../entities/team/teams.dal";



export default async (req, res) => {
    const { username, passphrase } = req.query;
    const userFromDb = await getUser(username);
    if (userFromDb) {
        res.status(200).send();
    } else {
        res.status(401).send();
    }
};
