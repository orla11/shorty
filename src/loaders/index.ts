import express from 'express';
import logger from './logger';
import expressLoader from './express';

export default async ({ expressApp }: { expressApp: express.Application }) => {
    const NAMESPACE = 'Loader';

    await expressLoader({ app: expressApp });
    logger.info(`[${NAMESPACE}] - Express loaded`);
};
