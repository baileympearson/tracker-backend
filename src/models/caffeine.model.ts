import Joi, { number, string } from "joi";
import { makeFieldsRequired } from "../utils";

const amountOfCaffeine = ['full caffeine', 'half caffeine', 'quarter caffeine', 'eighth caffeine ', 'decaf'] as const
export type AmountOfCaffeine = typeof amountOfCaffeine[number]
const numericValue = [1, .5, .25, .125, 0] as const;
export type NumericValue = typeof numericValue[number]

export interface CaffeineEntry {
    value: AmountOfCaffeine,
    numericValue: NumericValue
    date: string
}



export interface TotalCaffeineQuery {
    date: string // YYYY-MM-DD
    returnMgCaffeine?: boolean
}

export const totalCaffeineQuerySchema = Joi.object<TotalCaffeineQuery>({
    date: Joi.string().required(),
    returnMgCaffeine: Joi.boolean()
})

const caffeineEntry = {
    value: Joi.string().valid(...amountOfCaffeine),
    numericValue: Joi.number().valid(...numericValue),
    date: Joi.string()
}

export const partialCaffeineEntrySchema = Joi.object(caffeineEntry)

export const caffeineEntrySchema = makeFieldsRequired(caffeineEntry)