import { ObjectId } from "mongodb";
import { days } from "../../utils/day";
import { dissoc } from "../../utils/types.utils";
import { findPreferringUsersIndices } from "../preference/preference.utils";
import { ScoreStrategy } from "../score/score.strategy";
import { UserCurrentWeekPreference, UserRequest } from "../user/user.request";
import { Assignment } from "./assignment";

export class AssignmentStrategy {
    constructor(private readonly scoreStrategy: ScoreStrategy) { }
    assign(
        usersRequests: UserRequest[],
    ): Assignment {
        const usersScores = usersRequests.map(this.scoreStrategy.calculateUserScore);
        const trivialAssignments = this.assignTrivialPreferences(usersRequests);
        return [
            { _id: new ObjectId(), name: "" },
            { _id: new ObjectId(), name: "" },
            { _id: new ObjectId(), name: "" },
            { _id: new ObjectId(), name: "" },
            { _id: new ObjectId(), name: "" },
            { _id: new ObjectId(), name: "" },
            { _id: new ObjectId(), name: "" },
        ];
    }

    /**
     * for each day
     *  day.users = all users which prefer this day
     *  filter day.users.length==1
     * @param usersRequests 
     */
    assignTrivialPreferences(usersRequests: UserCurrentWeekPreference[]): Partial<Assignment> {
        const currentWeekRequests = usersRequests.map(({ currentWeekPreferences }) => currentWeekPreferences);
        return days
            .map(day => ({
                ...day,
                users: findPreferringUsersIndices(currentWeekRequests)(day)
            }))
            .filter(({ users }) => users.length == 1)
            .map(day => ({
                [day._id]: dissoc("currentWeekPreferences", usersRequests[day.users[0]])
            }))
            .reduce((acc, curr) => ({
                ...acc,
                ...curr
            }), {});
    }


}