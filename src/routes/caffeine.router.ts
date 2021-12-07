import { Request, Response, Router } from "express";
import { connect } from "../db/db";
import caffeineClient from '../db/caffeine.db';
import { CaffeineEntry, caffeineEntrySchema } from "../models/caffeine.model";
import { schemaValidator } from "../middleware/schema-validator";

const router = Router()

async function dbHandlers() {
    const client = await connect()
    const collection = client.db().collection<CaffeineEntry>('caffeine')
    return caffeineClient(collection);
}

async function postHandler(req: Request, res: Response) {
    const body = req.body
    console.log(body)

    const { add } = await dbHandlers()

    try {
        await add(body as CaffeineEntry)
        res.status(201).send(body)
    } catch (err) {
        console.error(err)
        res.status(500)
    }
}

router.post('/',
    schemaValidator(caffeineEntrySchema),
    postHandler
)

export { router }