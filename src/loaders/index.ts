import express from 'express';
import logger from './logger';
import expressLoader from './express';

export default async ({ expressApp }: { expressApp: express.Application }) => {
    const NAMESPACE = 'Loader';

    // const urlModel = {
    //     name: 'urlModel',
    //     model: require('../models/url').default
    // };

    await expressLoader({ app: expressApp });
    logger.info(`[${NAMESPACE}] - Express loaded`);
};
