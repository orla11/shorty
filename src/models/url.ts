import mongoose from 'mongoose';
import { IUrl } from '../interfaces/IUrl';

const Url = new mongoose.Schema(
    {
        urlCode: String,
        originalUrl: {
            type: String,
            required: [true, 'Please provide a valid url']
        },
        shortUrl: String,
        clicksCount: Number
    },
    { timestamps: true }
);

export default mongoose.model<IUrl & mongoose.Document>('Url', Url);
