import { ObjectId } from "mongodb";
import { priorities } from "../../utils/priority";
import { startOfNextWeek } from "../../utils/time";
import { AbsolutePreference, MinimalPreference, Preference } from "./preference";
import { lastElementOf } from '../../utils/array.utils';
import { Day } from "../../utils/day";
import { isDefined } from "../../utils/types.utils";

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

export const findPreferringUsersIndices = (usersPreferences: Preference[][]) =>
    (day: Day): number[] =>
        usersPreferences
            .map((currUserPreferences, index) =>
                currUserPreferences.some(preference => preference.day == day) ? index : null)
            .filter(isDefined)


