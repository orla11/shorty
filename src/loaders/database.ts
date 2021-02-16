import mongoose from 'mongoose';
import { Db } from 'mongodb';
import config from '../config';
import logger from './logger';

export default async (memory_server: boolean = false): Promise<Db> => {
    try {
        const dbUrl = memory_server ? global.__MONGO_URI__ : config.database.URL;

        const connection = await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });
        return connection.connection.db;
    } catch (error) {
        logger.error('🔥 Error on mongoose loader: %o', error);
        throw error;
    }
};
