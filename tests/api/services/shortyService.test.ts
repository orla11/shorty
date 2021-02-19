import shortyService from '../../../src/services/shortyService';
import express from 'express';
import loaders from '../../../src/loaders';

const app = express();

beforeAll(async (done) => {
    await loaders({ expressApp: app, testDb: false });
    done();
});

describe('shortyService test', () => {
    it('should return', async () => {});
});
