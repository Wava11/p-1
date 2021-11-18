import { MongoClient } from 'mongodb';
import { dbName, mongoConnectionString } from './db';


export const registerUser = async (username, passphrase) => {
    const mongoClient = await MongoClient.connect(mongoConnectionString);
    await mongoClient.db(dbName).collection(collectionName).insertOne({
        _id: username,
        passphrase
    });
    await mongoClient.close();
};

export const getUser = async (username, passphrase) => {
    const mongoClient = await MongoClient.connect(mongoConnectionString);
    const user = await mongoClient.db(dbName).collection(collectionName).findOne({
        _id: username,
        passphrase
    });
    await mongoClient.close();
    return user;
};

export const getAllUsers = async () => {
    const mongoClient = await MongoClient.connect(mongoConnectionString);
    const users = await mongoClient.db(dbName).collection(collectionName).find({}).toArray();
    await mongoClient.close();
    return users;
};


const collectionName = "users";