import { HasScore, UserScore } from "../user/user.request";

export const ascendingScore = <T extends HasScore>(score1: T, score2: T): number =>
    score1.score - score2.score;
export const descendingScore = <T extends HasScore>(score1: T, score2: T): number =>
    -ascendingScore(score1, score2);

export const toUserWithHighestScore = (currentlyHighestScored: UserScore, currentUser: UserScore) =>
    currentUser.score > currentlyHighestScored.score ?
        currentUser : currentlyHighestScored;
export const toUserWithLowestScore = (currentlyLowestScored: UserScore, currentUser: UserScore) =>
    currentUser.score < currentlyLowestScored.score ?
        currentUser : currentlyLowestScored;