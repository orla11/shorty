import { Router } from 'express';
import apiHealthCheck from './routes/apiHealthCheck';
import shorty from './routes/shorty';

export default () => {
    const app = Router();

    apiHealthCheck(app);
    shorty(app);

    return app;
};
