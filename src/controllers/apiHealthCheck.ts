import { Request, Response, NextFunction } from 'express';
import apiHealthCheckService from '../services/apiHealthCheck';
import logger from '../loaders/logger';

const NAMESPACE = 'apiHealthCheck Controller';

const apiHealthCheck = async (req: Request, res: Response, next: NextFunction) => {
    const apiHealthCheckInstance = new apiHealthCheckService();

    apiHealthCheckInstance.logInConsole();

    logger.info(`[${NAMESPACE}] - Api Health Check route controller`);

    return res.status(200).json({});
};

export default { apiHealthCheck };
