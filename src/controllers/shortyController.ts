import { Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
// import shortyService from '../services/shortyService';
import logger from '../loaders/logger';

const NAMESPACE = 'shorty Controller';

const shortUrl = async (req: Request, res: Response, next: NextFunction) => {
    logger.info(`[${NAMESPACE}] - Shorty route controller`);

    return res.status(201).json({});
};

export default { shortUrl };
