import { UserRequest } from "../user/user.request";

export interface ScoreStrategy {
    calculateUserScore: (userRequest: UserRequest) => number;
}