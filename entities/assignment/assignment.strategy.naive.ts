import { UserRequest } from "../user/user.request";
import { Assignment } from "./assignment";
import { AssignmentStrategy } from "./assignment.strategy";

/**
 * This strategy takes into consideration only the amount of unment preferences
 */
export class NaiveAssignmentStrategy extends AssignmentStrategy {
    calculateUserScore: (userRequest: UserRequest) => number;
    applyScores: (usersScores: number[], usersRequests: UserRequest[]) => number;
    
}