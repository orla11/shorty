import express from 'express';
import logger from './logger';
import dependencyInjectorLoader from './dependencyInjector';
import expressLoader from './express';

export default async ({ expressApp }: { expressApp: express.Application }) => {
    const NAMESPACE = 'Loader';

    const urlModel = {
        name: 'urlModel',
        model: require('../models/url').default
    };

    // Injecting models into container
    dependencyInjectorLoader({
        models: [urlModel]
    });

    await expressLoader({ app: expressApp });
    logger.info(`[${NAMESPACE}] - Express loaded`);
};
