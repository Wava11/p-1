export default (req, res) => {
    if (req.method == "POST") {
        console.log(req.body);
        res.status(200).send();
    } else {
        res.status(404).send();
    }
}