import { Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
// import shortyService from '../services/shortyService';
import { Logger } from 'winston';
import config from '../config';
import validUrl from 'valid-url';

const NAMESPACE = 'shorty Controller';

const shortUrl = async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');

    logger.debug(`[${NAMESPACE}] - Shorty route controller: calling /shorty with body: ${req.body}`);

    const originalUrl = req.body.originalUrl;
    const baseUrl = config.server.hostname + ':' + config.server.port + '/' + config.api.prefix;

    if (!validUrl.isUri(baseUrl)) return res.status(500).json('Internal Server Error.');

    if (validUrl.isUri(originalUrl))
        // call service
        return res.status(201).json({});
};

export default { shortUrl };
