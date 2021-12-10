import { Router } from "express";
import { connect } from "../db/db";
import { ClimbingEntry, ClimbType } from "../models/climbs.model";
import climbService from '../db/climbs.db'

const router = Router()

async function handlers() {
    const client = await connect()
    const collection = client.db().collection<ClimbingEntry>('climbs')
    return climbService(collection)
}

router.post('/:type(trad|sport|boulder|top_rope)', async (req, res) => {
    const payload = req.body as ClimbingEntry;

    const { add } = await handlers()

    try {
        const { insertedId } = await add(payload)
        res.status(201).send({ ...payload, _id: insertedId })
    } catch {
        console.error("something went wrong adding a climb")
        res.send(500)
    }
})

export { router }