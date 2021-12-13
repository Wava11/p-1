import { ObjectId } from "mongodb";
import { UserRequest } from "../user/user.request";
import { Assignment } from "./assignment";

export abstract class AssignmentStrategy {
    assign(
        usersRequests: UserRequest[],
    ): Assignment {
        const usersScores = usersRequests.map(this.calculateUserScore);
        const usersAssignments = this.applyScores(usersScores, usersRequests);
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

    abstract calculateUserScore: (userRequest: UserRequest) => number;
    abstract applyScores: (usersScores: number[], usersRequests: UserRequest[]) => number;
}