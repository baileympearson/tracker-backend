import { MongoClient } from "mongodb";
import { Config } from "../config/config.model";
import config from '../config'

let client: MongoClient

function makeUri(config: Config) {
    if (config.environment === 'dev') {
        const { port, host } = config.db
        return `mongodb://${host}:${port}/tracker`
    }
}

export async function connect(): Promise<MongoClient> {
    if (client != null) {
        return client
    }

    const connection_string = makeUri(config);
    client = new MongoClient(connection_string)
    await client.connect()

    console.error("Successfully connected to db at: ", client.db().namespace)

    return client
}
