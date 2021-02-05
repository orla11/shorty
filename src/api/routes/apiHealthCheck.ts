import { Router } from 'express';
import apiHealthCheckController from '../../controllers/apiHealthCheck';

const route = Router();

export default (app: Router) => {
    app.use('/', route);

    route.get('/status', apiHealthCheckController.apiHealthCheck);
};
