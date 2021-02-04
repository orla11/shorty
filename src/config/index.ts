import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();

if (envFound.error) throw new Error("⚠️  Couldn't find .env file  ⚠️");

const server = {
    hostname: process.env.SERVER_HOSTNAME || 'localhost',
    port: process.env.SERVER_PORT || 1337
};

const database = {};

const logs = {
    level: process.env.LOG_LEVEL || 'silly'
};

const api = {
    prefix: '/api'
};

const config = {
    server,
    api,
    database,
    logs
};

export default config;
