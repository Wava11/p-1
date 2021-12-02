import { getUserPreferences, updateUserPreferences } from '../../../../entities/preference/preferences.dal';
import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import { AbsolutePreference, MinimalPreference } from '../../../../entities/preference/preference';
import { toAbsolutePreference, toRelativePreference } from '../../../../entities/preference/preference.utils';

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
        const userPreferences: MinimalPreference[] = JSON.parse(req.body);
        const absolutePreferences: AbsolutePreference[] = userPreferences.map(toAbsolutePreference(new ObjectId(userId)));
        await updateUserPreferences(userObjectId, absolutePreferences);
        res.status(200).send("");
    } else {
        res.status(400).send("");
    }
};

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
    const { userId } = req.query;
    if (typeof userId === "string") {
        const userObjectId = new ObjectId(userId);

        const absoluteUserPreferences = await getUserPreferences(userObjectId);
        const relativeUserPreferences = absoluteUserPreferences.map(toRelativePreference);
        if (relativeUserPreferences) {
            res.status(200).json(relativeUserPreferences);
        } else {
            res.status(404).send("");
        }
    } else {
        res.status(400).send("");
    }
};