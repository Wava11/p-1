export default async (req, res) => {

    if (req.method == "POST") {
        await handlePost(req, res);
    } else if (req.method == "GET") {
        await handleGet(req, res);
    } else {
        res.status(404).send();
    }
};

const handlePost = async (req, res) => {
    const {username} = req.query;
    prefs[username] = JSON.parse(req.body);
    console.log(prefs);
    res.status(200).send();
};

const handleGet = async (req, res) => {
    const { username } = req.query;
    const userPreferences = prefs[username];
    if(userPreferences){
        res.status(200).json(userPreferences);
    } else {
        res.status(404).send();
    }
};

let prefs = {};