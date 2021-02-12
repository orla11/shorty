import { Router } from 'express';
import shortyController from '../../controllers/shortyController';

const route = Router();

export default (app: Router) => {
    app.use('/shorty', route);

    route.post('/', shortyController.shortUrl);
};
