import Joi, { ObjectSchema } from "joi";


export function makeFieldsRequired(schemaObject: { [key: string]: Joi.Schema}): ObjectSchema {
    return Joi.object(schemaObject).fork(Object.keys(schemaObject), (schema) => schema.required())
}