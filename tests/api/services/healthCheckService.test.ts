import apiHealthCheckService from '../../../src/services/apiHealthCheck';

describe('Api Health Check Service test', () => {
    it('should console log apiHealthCheckService', async () => {
        console.log = jest.fn();
        const apiHealthCheckServiceInstance = new apiHealthCheckService();

        apiHealthCheckServiceInstance.logInConsole();

        expect(console.log).toHaveBeenCalledWith('apiHealthCheckService');
    });
});
