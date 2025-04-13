import { allowedOrigin } from "./allowedOrigins";
import { CorsOptions } from "cors"; 

const corsOption: CorsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        console.log(`Origin: ${origin}`);
        if (!origin || allowedOrigin.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not Allowed by CORS'));
        }
    },
    credentials: true,
    allowedHeaders: [
        'Content-Type', 
        'Authorization',
        'Access-Control-Allow-Origin',
        'Access-Control-Allow-Credentials',
        'Set-Cookie'
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],   
};

export default corsOption;
