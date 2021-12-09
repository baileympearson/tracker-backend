import { Request, Response, Router } from "express";
import { connect } from "../db/db";
import caffeineClient from '../db/caffeine.db';
import { CaffeineEntry, caffeineEntrySchema, partialCaffeineEntrySchema, TotalCaffeineQuery, totalCaffeineQuerySchema } from "../models/caffeine.model";
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

async function totalCaffeineHandler(req: Request, res: Response) {
    const { returnMgCaffeine, date } = req.body as TotalCaffeineQuery

    const { totalCaffeinePerDay } = await dbHandlers()

    try {
        const caffeinePerDay = await totalCaffeinePerDay(date, { returnMgCaffeine })
        res.status(200).send(caffeinePerDay)
    } catch (err) {
        console.error(err)
        res.status(500)
    }
}

async function getCaffeineEntriesHandler(req: Request, res: Response) {
    const filter = req.body as Partial<CaffeineEntry>

    const { getAll } = await dbHandlers()

    try {
        const entries = await getAll(filter)
        res.status(200).send(entries)
    } catch {
        console.error("Something went wrong")
        res.sendStatus(500)
    }
}


router.get('',
    schemaValidator(partialCaffeineEntrySchema),
    getCaffeineEntriesHandler
)

router.get('/totalCaffeine',
    schemaValidator(totalCaffeineQuerySchema),
    totalCaffeineHandler
)

router.post('/',
    schemaValidator(caffeineEntrySchema),
    postHandler
)

export { router }