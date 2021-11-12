const users = {};

export default (req, res) => {
    const { username, passphrase } = req.query;
    if (username in users && users[username].passphrase == passphrase) {
        res.status(200).send();
    } else {
        res.status(401).send();
    }
};
