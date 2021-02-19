import supertest from 'supertest';
import express from 'express';
import loaders from '../../src/loaders';
import config from '../../src/config';
import mongoose from 'mongoose';

const app = express();

beforeAll(async (done) => {
    await loaders({ expressApp: app, testDb: false });
    done();
});

describe('Api Health Check', () => {
    it('should return 200 when GET /api/v1/status', async () => {
        const res = await supertest(app)
            .get(config.api.prefix + '/status')
            .send();
        expect(res.status).toBe(200);
    });
    it('should return 404 when GET /api/v1/nonexistingapiroute', async () => {
        const res = await supertest(app)
            .get(config.api.prefix + '/nonexistingapiroute')
            .send();
        expect(res.status).toBe(404);
    });
});
