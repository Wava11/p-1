import { getUserPreferences, updateUserPreferences } from '../../../../entities/preference/preferences.dal';
import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';

export default async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method == "POST") {
        await handlePost(req, res);
    } else if (req.method == "GET") {
        await handleGet(req, res);
    } else {
        res.status(404).send("");
    }
};

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
    const { userId } = req.query;
    if (typeof userId === "string") {
        const userObjectId = new ObjectId(userId);
        const preferences = JSON.parse(req.body);
        updateUserPreferences(userObjectId, preferences);
        console.log(preferences);
        res.status(200).send("");
    } else {
        res.status(400).send("");
    }
};

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
    const { userId } = req.query;
    if (typeof userId === "string") {
        const userObjectId = new ObjectId(userId);
        const userPreferences = getUserPreferences(userObjectId);
        if (userPreferences) {
            res.status(200).json(userPreferences);
        } else {
            res.status(404).send("");
        }
    }
};