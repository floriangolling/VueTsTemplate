import dotenv from 'dotenv';

dotenv.config();

const Config = {
    //Server Config
    PORT: process.env.PORT ? parseInt(process.env.PORT) : 8080,
    URL: process.env.URL || 'http://localhost',

    //Database Config
    host: 'localhost' || process.env.DB_HOST,
    database: 'postgres' || process.env.DB_NAME,
    password: 'toto' || process.env.DB_PASSWORD,
    username: 'postgres' || process.env.DB_USER,

};

export default Config;