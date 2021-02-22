// import 'reflect-metadata';

import { Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { Logger } from 'winston';
import config from '../config';
import validUrl from 'valid-url';
import shortyService from '../services/shortyService';

const NAMESPACE = 'shorty Controller';

const shortUrl = async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    const shortyServiceInstance = Container.get(shortyService);

    logger.debug(`[${NAMESPACE}] - Shorty route controller: calling /shorty with body: %o`, req.body);

    const originalUrl = req.body.originalUrl;
    const baseUrl = config.server.hostname + ':' + config.server.port + '/' + config.api.prefix;

    if (!isValidUrl(originalUrl)) return res.status(500).json('Internal Server Error.');

    if (isValidUrl(originalUrl)) {
        const url = await shortyServiceInstance.urlExists(originalUrl);
        if (url) return res.status(200).json(url);

        const shortenedUrl = await shortyServiceInstance.shortUrl(baseUrl, originalUrl);
        return res.status(201).json(shortenedUrl);
    }

    return res.status(400).json('Invalid URL. Enter a valid url.');
};

const getShortUrl = async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    const shortyServiceInstance = Container.get(shortyService);

    logger.debug(`[${NAMESPACE}] - Shorty route controller: calling get /shorty with params: %o`, req.params);

    const urlCode = req.params.shortUrl;

    let url = await shortyServiceInstance.loadShortUrl(urlCode);

    if (!url) return res.status(400).json('Short url not found');

    if (isClicksLimitReached(url.clicksCount)) {
        logger.info(`[${NAMESPACE}] - The short url ${url.shortUrl} clicks limit has been reached.`);
        return res.status(400).json(`The short url ${url.shortUrl} clicks limit has been reached.`);
    }

    url.clicksCount++;
    await shortyServiceInstance.updateUrlClicksCount(urlCode, url.clicksCount);
    return res.redirect(url.originalUrl);
};

const isValidUrl = (originalUrl: string) => {
    return validUrl.isUri(originalUrl);
};

const isClicksLimitReached = (clicksCount: number): boolean => {
    return clicksCount >= config.api.allowedClicks;
};

export default { shortUrl, getShortUrl };
