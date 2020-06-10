import mongoose, { Schema, Document } from 'mongoose';
import validator from 'validator';

const ConferenceSchema: Schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    projects: [String],
    location: {
        city: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
    },
    tags: [String],
    dateStart: {
        type: Date,
        required: true,
    },
    dateFinish: {
        type: Date,
        required: true,
    },
    participants: { type: mongoose.Schema.Types.Mixed, default: {} },
    ytLink: {
        type: String,
        validate(url) {
            return new RegExp('(http|https):\\/\\/youtrack\\.jetbrains\\.com\\/issue\\/.+-.+').test(url);
        },
    },
    attendance: Number,
    link: {
        type: String,
        validate(url) {
            return validator.isURL(url);
        },
    },
    comments: [String],
    status: {
        type: String,
        enum: ['ACCEPTED', 'PROPOSED', 'REJECTED'],
        required: true,
    },
}, { minimize: false });

interface ConferenceDocument extends Document {
    title: string,
    projects: string[],
    location: {
        city: string,
        country: string,
    },
    tags: string[],
    dateStart: Date,
    dateFinish: Date,
    participants: object,
    ytLink: string,
    attendance: number,
    link: string,
    comments: string[],
    status: string,
}

const Model = mongoose.model<ConferenceDocument>('Conference', ConferenceSchema);

export { ConferenceDocument as Document, Model };
