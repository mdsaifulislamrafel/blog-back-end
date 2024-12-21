import dotenv from 'dotenv';
import path from 'path';


dotenv.config({path: path.join(process.cwd(), '.env')});

export default {
    port: process.env.PORT,
    databaseUrl: process.env.DATABASE_URL,
    jwt_secret: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV,
}