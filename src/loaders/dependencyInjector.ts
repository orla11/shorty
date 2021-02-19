import { Container } from 'typedi';
import loggerInstance from './logger';
import nanoidInstance from './nanoid';

export default ({ models }: { models: { name: string; model: any }[] }) => {
    try {
        models.forEach((m) => {
            Container.set(m.name, m.model);
        });

        Container.set('logger', loggerInstance);
        Container.set('nanoid', nanoidInstance);
    } catch (e) {
        loggerInstance.error('🔥 Error on dependency injector loader: %o', e);
        throw e;
    }
};
