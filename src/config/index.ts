import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();

if (envFound.error) throw new Error("⚠️  Couldn't find .env file  ⚠️");

const server = {
    hostname: process.env.SERVER_HOSTNAME || 'localhost',
    port: process.env.SERVER_PORT || 1337
};

const database = {
    URL: process.env.MONGODB_URI || 'mongodb://localhost:27017/example',
    testURL: process.env.TEST_MONGODB_URI || 'mongodb://localhost:27017/jest'
};

const logs = {
    level: process.env.LOG_LEVEL || 'silly'
};

const api = {
    prefix: '/api/v1',
    // useful option which might
    // be used for billing purposes
    allowedClicks: 10
};

const config = {
    server,
    api,
    database,
    logs
};

export default config;
