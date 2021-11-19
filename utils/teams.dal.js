import { MongoClient, ObjectId } from 'mongodb';
import { dbName, getCollection, getConnection, mongoConnectionString } from './db';


export const registerTeam = async (name) => {
    const mongoClient = await MongoClient.connect(mongoConnectionString);
    await mongoClient.db(dbName).collection(collectionName).insertOne({
        _id: new ObjectId(),
        name
    });
    await mongoClient.close();
};

export const addUserToTeam = async (userName, teamId) => {
    const mongoClient = await MongoClient.connect(mongoConnectionString);
    const user = await mongoClient.db(dbName).collection(collectionName).updateOne({
        _id: teamId,
    }, {
        $push: {
            members: {
                _id: new ObjectId(),
                name: userName
            }
        }
    });
    await mongoClient.close();
    return user;
};

export const getAllTeams = async () => {
    const users = (await getCollection(collectionName)).find({}).toArray();
    console.log("yoooo");
    return users;
};


const collectionName = "teams";