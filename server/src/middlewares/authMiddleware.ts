import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express"
import { errorHandler} from '../helpers/errorHandler'

interface AuthRequest extends Request{
    user?: string | JwtPayload
}

export const authMiddleware = (req:AuthRequest,res:Response,next:NextFunction) => {
    const token = req.headers['authorization']
    if(!token){
        return errorHandler(res, 401, 'Access denied', "token not found")
    }
    const tokenValue = token.replace('Bearer ', '').trim()
    try{
        const decoded = jwt.verify(tokenValue, process.env.ACCESS_TOKEN_SECRET!) as JwtPayload
        req.user = decoded
        next() 
    }catch(error){
        console.log(error)
        return errorHandler(res, 401, 'Unauthorized',"invalid token")
    }
}
