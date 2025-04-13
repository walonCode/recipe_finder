import { Response,} from 'express';

export const errorHandler =(res:Response, statusCode:number,message:string, error:Error | null | string) => {
    if(error){
        console.error(error)
    }
    return res.status(statusCode).json({
        success:false,
        message
    })
}