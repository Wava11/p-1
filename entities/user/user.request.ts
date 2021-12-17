import { AssignmentHistory } from "../assignment/assignment.history";
import { Preference } from "../preference/preference";
import { PreferencesHistory } from "../preference/preference.history";
import { User } from "./user";

export interface HasHistories {
    preferencesHistory: PreferencesHistory;
    assignmentHistory: AssignmentHistory;
}

export interface HasCurrentWeekUserRequest {
    currentWeekPreferences: Preference[];
}

export interface UserRequest extends User, HasHistories, HasCurrentWeekUserRequest { }

export interface UserCurrentWeekPreference extends User, HasCurrentWeekUserRequest { }