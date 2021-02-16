import supertest from 'supertest';
import express from 'express';
import loaders from '../../src/loaders';
import config from '../../src/config';
import validUrl from 'valid-url';
import Url from '../../src/models/url';

const app = express();

beforeAll(async (done) => {
    await loaders({ expressApp: app });
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
                expect(res.body._id).toBeTruthy();
                expect(res.body.originalUrl).toBe(data.originalUrl);
                expect(validUrl.isUri(res.body.shortUrl)).toBeTruthy();
                expect(res.body.urlCode).toBeTruthy();
                expect(res.body.clicksCount).toBe(0);
            });
    });
});
