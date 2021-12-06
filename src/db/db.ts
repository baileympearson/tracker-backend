import { MongoClient } from "mongodb";

let client : MongoClient

export async function connect(): Promise<MongoClient> {
    if (client != null) {
        return client
    }

    const connection_string = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/tracker${process.env.DEBUG === 'true' ? '_test' : ""}`
    client = new MongoClient(connection_string)
    await client.connect()

    console.error("Successfully connected to db at: ", client.db().namespace)

    return client
}
