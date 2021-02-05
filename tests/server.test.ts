import { default as request } from 'supertest';
import express from 'express';
import loaders from '../src/loaders';

const app = express();

beforeAll(async (done) => {
    await loaders({ expressApp: app });
    done();
});

describe('Server Health Check', () => {
    it('should return 200 when GET /status', async () => {
        const res = await request(app).get('/status').send();
        expect(res.status).toBe(200);
    });
    it('should return 200 when HEAD /status', async () => {
        const res = await request(app).head('/status').send();
        expect(res.status).toBe(200);
    });
    it('should return 404 when GET /nonexistingroute', async () => {
        const res = await request(app).head('/nonexistingroute').send();
        expect(res.status).toBe(404);
    });
});
