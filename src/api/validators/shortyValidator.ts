import { celebrate, Joi } from 'celebrate';

const NAMESPACE = 'shorty Validator';

const validateOriginalUrl = celebrate({
    body: Joi.object({
        originalUrl: Joi.string().required()
    })
});

export default { validateOriginalUrl };
