import express from 'express';
import logger from './logger';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './database';
import expressLoader from './express';

export default async ({ expressApp }: { expressApp: express.Application }) => {
    const NAMESPACE = 'Loader';

    await mongooseLoader();
    logger.info(`[${NAMESPACE}] - DB loaded and connected`);

    const urlModel = {
        name: 'urlModel',
        model: require('../models/url').default
    };

    // Injecting models into container
    dependencyInjectorLoader({
        models: [urlModel]
    });
    logger.info(`[${NAMESPACE}] - Dependency Injector loaded`);

    await expressLoader({ app: expressApp });
    logger.info(`[${NAMESPACE}] - Express loaded`);
};
