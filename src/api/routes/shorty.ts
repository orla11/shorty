import { Router } from 'express';
import shortyController from '../../controllers/shortyController';
import shortyValidator from '../validators/shortyValidator';

const route = Router();

export default (app: Router) => {
    app.use('/shorty', route);

    route.post('/', shortyValidator.validateOriginalUrl, shortyController.shortUrl);
};
