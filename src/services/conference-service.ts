import moment from 'moment';
import mongoose from 'mongoose';

import { Conference } from '../models';
import { DuplicateKeyError } from '../errors';

const { ObjectId } = mongoose.Types;

const getAllConferences = async (): Promise<Conference.Document[]> =>
    Conference.Model.find({});

const createNewConference = async (conferenceData): Promise<void> => {
    try {
        const newConference: Conference.Document = new Conference.Model(conferenceData);
        await newConference.save();
    } catch (e) {
        if (e.name === 'MongoError' && e.code === 11000) throw new DuplicateKeyError();
        throw e;
    }
};

const searchConference = async (conferenceData): Promise<Conference.Document[]> => {
    const caseInsensitiveDotNotation = (conferenceObject) => {
        const resultingObject = {};
        Object.keys(conferenceObject).forEach((key) => {
            const field = conferenceObject[key];
            if (typeof field === 'string') {
                if (ObjectId.isValid(field)) {
                    resultingObject[key] = field;
                } else if (moment(field, 'YYYY-MM-DDThh:mm:ss.SSSZ', true).isValid()) {
                    /* field is a valid Date */
                    resultingObject[key] = conferenceObject[key];
                } else resultingObject[key] = { $regex: new RegExp(`${field}`, 'i') };
            } else if (field instanceof Array) {
                resultingObject[key] = field;
            } else if (typeof field === 'object') {
                const nestedObject = caseInsensitiveDotNotation(conferenceObject[key]);
                Object.keys(nestedObject).forEach((nestedKey) => {
                    resultingObject[`${key}.${nestedKey}`] = nestedObject[nestedKey];
                });
            } else {
                resultingObject[key] = conferenceObject[key];
            }
        });
        return resultingObject;
    };

    const searchFor = caseInsensitiveDotNotation(conferenceData);
    return Conference.Model.find(searchFor);
};

export {
    getAllConferences,
    createNewConference,
    searchConference,
};
