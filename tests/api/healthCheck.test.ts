import { default as request } from 'supertest';
import express from 'express';
import loaders from '../../src/loaders';

const app = express();

beforeAll(async (done) => {
    await loaders({ expressApp: app });
    done();
});

describe('Api Health Check', () => {
    it('should return 200 when GET /api/status', async () => {
        const res = await request(app).get('/api/status').send();
        expect(res.status).toBe(200);
    });
    it('should return 404 when GET /api/nonexistingapiroute', async () => {
        const res = await request(app).get('/api/nonexistingapiroute').send();
        expect(res.status).toBe(404);
    });
});
