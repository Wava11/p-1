import { MongoClient } from "mongodb";

export const dbName = "dev";
export const mongoConnectionString = "mongodb+srv://me:moo@stresstest.605vo.mongodb.net/" + dbName + "?retryWrites=true&w=majority";

/**
 * @type MongoClient
 */
let connection;
const getConnection = async () =>
    connection = connection ?? await MongoClient.connect(mongoConnectionString);
export const getCollection = async (collectionName) =>
    (await getConnection()).db(dbName).collection(collectionName);