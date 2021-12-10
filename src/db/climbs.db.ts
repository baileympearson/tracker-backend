import { Collection } from 'mongodb'
import { ClimbingEntry } from '../models/climbs.model'

type ClimbsCollection = Collection<ClimbingEntry>

export default function (collection: ClimbsCollection) {
    async function get(filter: Partial<ClimbingEntry> = {}) {
        return await collection.find(filter).toArray()
    }

    async function add(entry: ClimbingEntry) {
        try {
            return await collection.insertOne(entry)
        } catch {
            console.error("Unable to add document to db: ", entry)
            return Promise.reject()
        }
    }

    return {
        getAll: get,
        add,
    }
}
