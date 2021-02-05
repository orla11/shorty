import { default as request } from 'supertest';
import express from 'express';
import loaders from '../src/loaders';

const app = express();

beforeAll(async (done) => {
    await loaders({ expressApp: app });
    done();
});

describe('Server health check', () => {
    it('should return code 200 and pong message when hitting /ping', async () => {
        const res = await request(app).get('/get').send();

        expect(res.status).toEqual(200);
        expect(res.body.message).toEqual('pong');
    });
});
