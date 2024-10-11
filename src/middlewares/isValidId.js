import createHttpError from "http-errors";
import { isValidObjectId } from "mongoose";

export const isValidId = (idName = 'id') => (req, res, next) => {

    const id = req.params[idName];

    if(!isValidObjectId(id)) {
        return next(createHttpError(400, 'invalid id'));
    }

    return next();
};
