import moment from "moment";
import { ObjectId } from "mongodb";
import { getCollection } from "../../utils/db";
import { startOfNextWeek } from "../../utils/time";
import { AbsolutePreference } from "./preference";

export const getUserPreferences = async (userId: ObjectId): Promise<AbsolutePreference[]> => {
    const oneWeekFromNow = moment().add(1, "week");
    const beginingOfNextWeek = oneWeekFromNow.startOf("week").toDate();
    const endOfNextWeek = oneWeekFromNow.endOf("week").toDate();

    const preferences = await (await getCollection(collectionName)).find({
        userId,
        $and: [
            { date: { $lt: endOfNextWeek } },
            { date: { $gte: beginingOfNextWeek } },
        ]
    }).toArray() as AbsolutePreference[];
    console.log(beginingOfNextWeek);
    console.log(endOfNextWeek);
    console.log(preferences);

    return preferences;
};

export const updateUserPreferences = async (userId: ObjectId, preferences: AbsolutePreference[]) => {
    const collection = (await getCollection(collectionName));
    await collection.deleteMany({ userId, date: { $gte: startOfNextWeek().toDate() } });
    await collection.insertMany(preferences);
};

const collectionName = "preferences";