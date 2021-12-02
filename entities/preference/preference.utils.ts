import { ObjectId } from "mongodb";
import { priorities } from "../../utils/priority";
import { startOfNextWeek } from "../../utils/time";
import { AbsolutePreference, MinimalPreference } from "./preference";
import { lastElementOf } from '../../utils/array.utils';

export const toAbsolutePreference = (userId: ObjectId) => (preference: MinimalPreference): AbsolutePreference => ({
    userId,
    date: startOfNextWeek().add(preference.day._id, "days").toDate(),
    day: preference.day,
    isAvailable: preference.isAvailable,
    priority: preference.priority ?? lastElementOf(priorities)
});
export const toRelativePreference = (preference: AbsolutePreference): MinimalPreference => ({
    day: preference.day,
    isAvailable: preference.isAvailable,
    priority: preference.priority ?? lastElementOf(priorities)
});