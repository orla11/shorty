import express from 'express';
import cors from 'cors';
import config from '../config';
import logger from './logger';
import routes from '../api';

export default async ({ app }: { app: express.Application }) => {
    const NAMESPACE = 'Server';

    app.use((req, res, next) => {
        logger.info(`[${NAMESPACE}] - METHOD: [${req.method}], URL: [${req.url}], IP: [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            logger.info(`[${NAMESPACE}] - METHOD: [${req.method}], URL: [${req.url}], IP: [${req.socket.remoteAddress}], STATUS: [${res.statusCode}]`);
        });

        next();
    });

    /*
     * Health Check endpoints
     */
    app.get('/status', (req, res) => {
        res.status(200).end();
    });
    app.get('/status', (req, res) => {
        res.status(200).end();
    });

    app.enable('trust proxy');

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    app.use(cors());

    app.use(config.api.prefix, routes());

    app.use((req, res, next) => {
        const error = new Error('Not Found');

        return res.status(404).json({
            message: error.message
        });
    });
};
