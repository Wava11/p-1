import { ObjectId } from "mongodb";
import { User } from "../user/user";

export interface Team {
    _id: ObjectId;
    name: string;
    members: User[];
}