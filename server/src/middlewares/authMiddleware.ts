import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express"
import { errorHandler} from '../helpers/errorHandler'

export interface AuthRequest extends Request{
    user?: {id:string} | JwtPayload
}

export const authMiddleware = (req:AuthRequest,res:Response,next:NextFunction):void => {
    const token = req.headers['authorization']
    if(!token){
        errorHandler(res, 401, 'Access denied', "token not found")
        return
    }
    const tokenValue = token.replace('Bearer ', '').trim()
    try{
        const decoded = jwt.verify(tokenValue, process.env.ACCESS_TOKEN_SECRET!) as JwtPayload
        req.user = decoded as {id: string}
        next() 
    }catch(error){
        console.log(error)
        errorHandler(res, 401, 'Unauthorized',"invalid token")
        return
    }
}
