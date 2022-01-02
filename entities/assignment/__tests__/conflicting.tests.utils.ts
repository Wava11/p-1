import { Day } from "../../../utils/day";
import { Priority } from "../../../utils/priority";
import { User } from "../../user/user";
import { UserCurrentWeekPreferenceWithScore } from "../../user/user.request";

export const generateUserCurrentWeekSinglePreference = (
    user: User,
    day: Day,
    priority: Priority,
    isAvailable: boolean,
    score: number,
): UserCurrentWeekPreferenceWithScore => ({
    ...user,
    currentWeekPreferences: [{ isAvailable, day, priority }],
    score
});
