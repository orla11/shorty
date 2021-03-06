import supertest from 'supertest';
import express from 'express';
import loaders from '../src/loaders';
import mongoose from 'mongoose';

const app = express();

beforeAll(async (done) => {
    await loaders({ expressApp: app, testDb: false });
    done();
});

describe('Server Health Check', () => {
    it('should return 200 when GET /status', async () => {
        const res = await supertest(app).get('/status').send();
        expect(res.status).toBe(200);
    });
    it('should return 200 when HEAD /status', async () => {
        const res = await supertest(app).head('/status').send();
        expect(res.status).toBe(200);
    });
    it('should return 404 when GET /nonexistingroute', async () => {
        const res = await supertest(app).head('/nonexistingroute').send();
        expect(res.status).toBe(404);
    });
});
