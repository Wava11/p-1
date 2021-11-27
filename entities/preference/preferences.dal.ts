import { ObjectId } from "mongodb";
import { getCollection } from "../../utils/db";
import { AbsolutePreference } from "./preference";

export const getUserPreferences = async (userId: ObjectId) => {
    const preferences = (await getCollection(collectionName)).find({ _id: userId });
    return preferences;
};

export const updateUserPreferences = async (userId: ObjectId, preferences: AbsolutePreference[]) => {
    const updates = preferences.map(pref => ({
        updateOne: {
            filter: { userId, date: pref.date },
            update: { $set: { isAvailable: pref.isAvailable, priority: pref.priority } }
        }
    }));
    return (await getCollection(collectionName)).bulkWrite(updates);
};

const collectionName = "preferences";