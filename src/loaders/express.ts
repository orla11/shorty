import express from 'express';
import cors from 'cors';
import config from '../config';
import logger from './logger';

export default ({ app }: { app: express.Application }) => {
    const NAMESPACE = 'Server';

    app.enable('trust proxy');

    app.use((req, res, next) => {
        logger.info(`[${NAMESPACE}] - METHOD: [${req.method}], URL: [${req.url}], IP: [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            logger.info(`[${NAMESPACE}] - METHOD: [${req.method}], URL: [${req.url}], IP: [${req.socket.remoteAddress}], STATUS: [${res.statusCode}]`);
        });
    });

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    app.use(cors());
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-with, Content-Type, Accept, Authorization');
        return res.status(200).json({});
    });

    // app.use(config.api.prefix, routes());

    app.use((req, res, next) => {
        const error = new Error('Not Found');

        return res.status(404).json({
            message: error.message
        });
    });
};
