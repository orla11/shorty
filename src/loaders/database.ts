import mongoose from 'mongoose';
import { Db } from 'mongodb';
import config from '../config';
import logger from './logger';

export default async (testDB: boolean = false): Promise<Db> => {
    try {
        let dbUrl: string = testDB ? config.database.testURL : config.database.URL;

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
