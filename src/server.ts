import 'reflect-metadata'; // mandatory when using @Decorators

import express from 'express';
import config from './config';
import logger from './loaders/logger';

async function startServer() {
    const NAMESPACE = 'Server';

    const server = express();

    await require('./loaders').default({ expressApp: server });

    server
        .listen(config.server.port, () => {
            logger.info(`[${NAMESPACE}] - Listening on ${config.server.hostname}:${config.server.port}`);
        })
        .on('error', (err) => {
            logger.error(`[${NAMESPACE} - ${err}]`);
            process.exit(1);
        });
}

startServer();
