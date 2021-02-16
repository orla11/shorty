import { Service, Inject } from 'typedi';
import { IUrl } from '../interfaces/IUrl';
import { nanoid } from 'nanoid';

@Service()
export default class shortyService {
    constructor(@Inject('urlModel') private urlModel: Models.UrlModel, @Inject('logger') private logger: any) {}

    public async shortUrl(baseUrl: string, originalUrl: string): Promise<IUrl> {
        try {
            const urlCode = nanoid(10);

            const shortUrl = baseUrl + '/' + urlCode;

            const shortenedUrl = await this.urlModel.create({
                urlCode,
                originalUrl,
                shortUrl,
                clicksCount: 0
            });

            const shortndUrl = shortenedUrl.toObject();
            Reflect.deleteProperty(shortndUrl, 'createdAt');
            Reflect.deleteProperty(shortndUrl, 'updatedAt');

            return shortndUrl;
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }

    public async urlExists(originalUrl: string): Promise<IUrl | null> {
        try {
            return this.urlModel.findOne({ originalUrl: originalUrl });
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }
}
