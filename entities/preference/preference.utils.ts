import { ObjectId } from "mongodb";
import { priorities } from "../../utils/priority";
import { startOfNextWeek } from "../../utils/time";
import { AbsolutePreference, MinimalPreference } from "./preference";

export const toAbsolutePreference = (userId: ObjectId) => (preference: MinimalPreference): AbsolutePreference => ({
    userId,
    date: startOfNextWeek().add(preference.day._id, "days").toDate(),
    day: preference.day,
    isAvailable: preference.isAvailable,
    priority: preference.priority ?? priorities.at(-1)
});
export const toRelativePreference = (preference: AbsolutePreference): MinimalPreference => ({
    day: preference.day,
    isAvailable: preference.isAvailable,
    priority: preference.priority ?? priorities.at(-1)
});