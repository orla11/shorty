import { Service } from 'typedi';

@Service()
export default class apiHealthCheckService {
    constructor() {}

    public logInConsole() {
        console.log('apiHealthCheckService');
    }
}
