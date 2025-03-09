import { NextFunction,Request,Response } from "express";
import { errorHandler } from "../helpers/errorHandler";

export const errorMiddleware = (err:Error, req:Request, res:Response, next:NextFunction) => {
    console.log(err)
    errorHandler(res, 500, "Internal Server Error", err)
    next()
}