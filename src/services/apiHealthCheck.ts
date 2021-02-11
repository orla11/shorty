import { Service } from 'typedi';

@Service('apiHealthCheckService')
export default class apiHealthCheckService {
    constructor() {}

    public async logInConsole() {
        console.log('apiHealthCheckService');
    }
}
