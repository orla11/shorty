import { Document, Model } from 'mongoose';
import { IUrl } from '../../interfaces/IUrl';

declare global {
    namespace Models {
        export type UrlModel = Model<IUrl & Document>;
    }
}
