import { Collection } from 'mongodb'
import { CaffeineEntry } from '../models/caffeine.model'

type CaffeineCollection = Collection<CaffeineEntry>

export default function (collection: CaffeineCollection) {
    async function get(filter: Partial<CaffeineEntry> = {}) {
        return await collection.find(filter).toArray()
    }

    async function add(entry: CaffeineEntry) {
        try {
            await collection.insertOne(entry)
        } catch {
            console.error("Unable to add document to db: ", entry)
        }
    }

    async function totalCaffeinePerDay(date: string, options?: { returnMgCaffeine?: boolean }) {
        options = options ?? {}

        const pipeline = [{
            $match: {
                date: date
            }
        }, {
            $group: {
                _id: "$date",
                "total": { $sum: "$numericValue" }
            }
        }]

        if (options.returnMgCaffeine) {
            pipeline.push({
                $project: {
                    "total": { $multiply: ["$total", 140] }
                }
            } as any)
        }

        try {
            const results = await collection.aggregate(pipeline).toArray()
            const total = results[0]?.total ?? 0;
            return { total }
        } catch {
            console.error("something went wrong")
            return Promise.reject()
        }
    }

    return {
        getAll: get,
        add,
        totalCaffeinePerDay
    }
}
