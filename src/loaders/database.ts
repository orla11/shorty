import mongoose from 'mongoose';
import { Db } from 'mongodb';
import config from '../config';
import logger from './logger';

export default async (): Promise<Db> => {
    try {
        const connection = await mongoose.connect(config.database.URL, {
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
