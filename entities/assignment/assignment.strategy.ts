import { days } from "../../utils/day";
import { dissoc } from "../../utils/object.utils";
import { PreferencesConflicts } from "../preference/preference.conflict";
import { findPreferringUsers, findPreferringUsersIndices, findUserWithHighestScore, findUserWithLowestScore } from "../preference/preference.utils";
import { ScoreStrategy } from "../score/score.strategy";
import { UserCurrentWeekPreference, UserCurrentWeekPreferenceWithScore, UserRequest, UserScore } from "../user/user.request";
import { Assignment } from "./assignment";

export class AssignmentStrategy {
    constructor(private readonly scoreStrategy: ScoreStrategy) { }
    assign(
        usersRequests: UserRequest[],
    ): Assignment {
        const usersCurrentWeekPreferencesWithScores = usersRequests.map(this.toUserCurrentWeekPreferenceWithScore);
        const trivialAssignments = this.assignTrivialPreferences(usersRequests);
        const conflicts = this.calculateConflicts(usersCurrentWeekPreferencesWithScores);
        const assignmentsToDaysWithConflictingPreferences = this.assignConflictingPreferences(conflicts);
        return this.assignNonPreferredDays(usersCurrentWeekPreferencesWithScores, { ...trivialAssignments, ...assignmentsToDaysWithConflictingPreferences });
    }

    /**
     * for each day
     *  day.users = all users which prefer this day
     *  filter day.users.length==1
     * @param usersRequests 
     */
    assignTrivialPreferences(usersCurrentWeekPreferences: UserCurrentWeekPreference[]): Partial<Assignment> {
        const currentWeekRequests = usersCurrentWeekPreferences.map(({ currentWeekPreferences }) =>
            currentWeekPreferences.filter(preference => preference.isAvailable));
        return days
            .map(day => ({
                ...day,
                users: findPreferringUsersIndices(currentWeekRequests)(day)
            }))
            .filter(({ users }) => users.length == 1)
            .map(day => ({
                [day._id]: dissoc("currentWeekPreferences", usersCurrentWeekPreferences[day.users[0]])
            }))
            .reduce((acc, curr) => ({
                ...acc,
                ...curr
            }), {});
    }

    assignConflictingPreferences(conflicts: PreferencesConflicts): Partial<Assignment> {
        throw new Error("not implemented");
    }

    calculateConflicts(usersCurrentWeekPreferences: UserCurrentWeekPreferenceWithScore[]): PreferencesConflicts {
        const preferringAndAvailableConflicts = days
            .map(findPreferringUsers(usersCurrentWeekPreferences, true))
            .map(findUserWithHighestScore);
        const preferringAndUnavailableConflicts = days
            .map(findPreferringUsers(usersCurrentWeekPreferences, false))
            .map(findUserWithLowestScore);
        throw new Error("not implemented");
    }



    toUserCurrentWeekPreferenceWithScore = (userRequest: UserRequest): UserCurrentWeekPreferenceWithScore => ({
        ...userRequest,
        score: this.scoreStrategy.calculateUserScore(userRequest)
    });

    assignNonPreferredDays(usersScores: UserScore[], assignments: Partial<Assignment>): Assignment {
        throw new Error("not implemented");
    }
}
