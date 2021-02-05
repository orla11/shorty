import { Router } from 'express';
import apiHealthCheck from './routes/apiHealthCheck';

export default () => {
    const app = Router();
    apiHealthCheck(app);

    return app;
};
