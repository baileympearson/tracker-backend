import { Collection } from 'mongodb'
import { CaffeineEntry } from '../models/caffeine.model'

type CaffeineCollection = Collection<CaffeineEntry>

export default function(collection: CaffeineCollection) {
    async function getAll()  {
        return await collection.find().toArray()
    }

    async function add(entry: CaffeineEntry) {
        try {
            await collection.insertOne(entry)
        } catch {
            console.error("Unable to add document to db: ", entry)
        }
    }

    return {
        getAll,
        add
    }
}
