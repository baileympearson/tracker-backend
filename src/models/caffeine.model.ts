import Joi from "joi";

const amountOfCaffeine = ['full caffeine', 'half caffeine', 'quarter caffeine', 'eighth caffeine ', 'decaf'] as const
export type AmountOfCaffeine = typeof amountOfCaffeine[number]
const numericValue = [1, .5, .25, .125, 0] as const;
export type NumericValue = typeof numericValue[number]

export interface CaffeineEntry {
    value: AmountOfCaffeine,
    numericValue: NumericValue
    date: string
}

export const caffeineEntrySchema = Joi.object({
    value: Joi.string().valid(...amountOfCaffeine).required(),
    numericValue: Joi.number().valid(...numericValue).required(),
    date: Joi.string().required()
})