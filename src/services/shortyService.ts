import { Service, Inject } from 'typedi';
import { IUrl } from '../interfaces/IUrl';

@Service()
export default class shortyService {
    constructor(@Inject('urlModel') private urlModel: Models.UrlModel, @Inject('logger') private logger: any, @Inject('nanoid') private nanoidGenerator: any) {}

    public async shortUrl(baseUrl: string, originalUrl: string): Promise<IUrl> {
        try {
            const urlCode = this.nanoidGenerator();

            const shortUrl = baseUrl + '/' + urlCode;

            const shortenedUrl = await this.urlModel.create({
                urlCode,
                originalUrl,
                shortUrl,
                clicksCount: 0
            });

            const shortndUrl = shortenedUrl.toObject();
            return this.serializeData(shortndUrl);
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }

    public async loadShortUrl(shortUrlCode: string): Promise<IUrl | null> {
        try {
            const shortenedUrl = await this.urlModel.findOne({ urlCode: shortUrlCode }).exec();
            if (shortenedUrl) return this.serializeData(shortenedUrl.toObject());
            return null;
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }

    public async urlExists(originalUrl: string): Promise<IUrl | null> {
        try {
            const shortenedUrl = await this.urlModel.findOne({ originalUrl: originalUrl }).exec();
            if (shortenedUrl) return this.serializeData(shortenedUrl.toObject());
            return null;
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }

    public async updateUrlClicksCount(shortUrlCode: string, clicksCount: number): Promise<IUrl> {
        try {
            return this.urlModel.updateOne({ urlCode: shortUrlCode }, { $set: { clicksCount: clicksCount } });
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }

    public serializeData(shortenedUrl: IUrl): IUrl {
        Reflect.deleteProperty(shortenedUrl, '_id');
        Reflect.deleteProperty(shortenedUrl, '__v');
        Reflect.deleteProperty(shortenedUrl, 'createdAt');
        Reflect.deleteProperty(shortenedUrl, 'updatedAt');
        return shortenedUrl;
    }
}
