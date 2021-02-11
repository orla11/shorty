import { Container } from 'typedi';
import loggerInstance from './logger';

export default ({ models }: { models: { name: string; model: any }[] }) => {
    try {
        models.forEach((m) => {
            Container.set(m.name, m.model);
        });

        Container.set('logger', loggerInstance);
    } catch (e) {
        loggerInstance.error('🔥 Error on dependency injector loader: %o', e);
        throw e;
    }
};
