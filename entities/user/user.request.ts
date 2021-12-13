import { AssignmentHistory } from "../assignment/assignment.history";
import { Preference } from "../preference/preference";
import { PreferencesHistory } from "../preference/preference.history";
import { User } from "./user";

export interface UserRequest extends User {
    preferencesHistory: PreferencesHistory;
    assignmentHistory: AssignmentHistory;
    currentWeekPreferences: Preference[];
}