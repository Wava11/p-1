import { ObjectId } from 'mongodb';
import { getCollection } from '../../utils/db';
import { User } from '../user/user';
import { Team } from './team';


export const registerTeam = async (name) =>
    (await getCollection(collectionName)).insertOne({
        _id: new ObjectId(),
        name
    });

export const addUserToTeam = async (userName, teamId) => {
    const user = await (await getCollection(collectionName)).updateOne({
        _id: teamId,
    }, {
        $push: {
            members: {
                _id: new ObjectId(),
                name: userName
            }
        }
    });
    return user;
};

export const getUser = async (userId: ObjectId): Promise<User> => {
    return (await getCollection(collectionName)).aggregate([
        {
            $unwind: "$members"
        },
        {
            $match: {
                "members._id": userId
            }
        }
    ]).toArray()[0];
};

export const getAllTeams = async () => {
    const users = await (await getCollection(collectionName)).find({}).toArray();
    return users;
};


const collectionName = "teams";