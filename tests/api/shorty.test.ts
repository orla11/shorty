import supertest from 'supertest';
import express from 'express';
import loaders from '../../src/loaders';
import config from '../../src/config';
import validUrl from 'valid-url';
import mongoose from 'mongoose';

const app = express();

beforeEach(async (done) => {
    await loaders({ expressApp: app, testDb: true });
    done();
});

afterEach(async (done) => {
    mongoose.connection.db.dropDatabase();
    done();
});

describe('shorty endpoints test', () => {
    it('should return 201 and a json with shortened url infos when POST /api/v1/shorty', async () => {
        const data = {
            originalUrl: 'https://www.youtube.com/watch?v=liJbB_0eCTo'
        };

        await supertest(app)
            .post(config.api.prefix + '/shorty')
            .send(data)
            .expect(201)
            .then(async (res) => {
                expect(res.body._id).toBeDefined();
                expect(res.body.originalUrl).toBe(data.originalUrl);
                expect(validUrl.isUri(res.body.shortUrl)).toBeTruthy();
                expect(res.body.urlCode).toBeTruthy();
                expect(res.body.clicksCount).toBe(0);
            });
    });

    it('should return 200 and a json with shortnened url which already exists when POST /api/v1/shorty', async () => {
        const data = {
            originalUrl: 'https://www.youtube.com/watch?v=liJbB_0eCTo'
        };

        await supertest(app)
            .post(config.api.prefix + '/shorty')
            .send(data);

        await supertest(app)
            .post(config.api.prefix + '/shorty')
            .send(data)
            .expect(200)
            .then(async (res) => {
                expect(res.body._id).toBeDefined();
                expect(res.body.originalUrl).toBe(data.originalUrl);
                expect(validUrl.isUri(res.body.shortUrl)).toBeTruthy();
                expect(res.body.urlCode).toBeTruthy();
                expect(res.body.clicksCount).toBe(0);
            });
    });
});
