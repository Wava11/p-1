import { UserRequest } from "../user/user.request";

/**
 * higher user score means higher probability that the user's preferences 
 * will be met in the next assignment.
 */
export interface ScoreStrategy {
    calculateUserScore: (userRequest: UserRequest) => number;
}