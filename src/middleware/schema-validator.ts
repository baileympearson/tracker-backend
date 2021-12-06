import { NextFunction, Request, RequestHandler, Response } from "express";
import Joi from "joi";

export function schemaValidator(schema: Joi.ObjectSchema): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error, value } = schema.validate(req.body, { stripUnknown: true })
        if (error) {
            return res.status(401).send({
                error: "invalid body"
            })
        }

        req.body = value

        return next()
    }
}