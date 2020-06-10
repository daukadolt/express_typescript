import { Request, Response } from 'express';

import { conferenceService } from '../services';
import { ValidationError, DuplicateKeyError } from '../errors';
import { Conference } from '../models';

const getAllConferences = async (req: Request, res: Response): Promise<Response> => {
    try {
        const allConferences: Conference.Document[] = await conferenceService.getAllConferences();
        return res.json(allConferences);
    } catch (e) {
        return res.sendStatus(500);
    }
};

const createNewConference = async (req: Request, res: Response): Promise<Response> => {
    try {
        const conferenceData = req.body;
        await conferenceService.createNewConference(conferenceData);
        return res.sendStatus(200);
    } catch (e) {
        if (e instanceof ValidationError) {
            return res.status(400).send(e.message);
        }
        if (e instanceof DuplicateKeyError) {
            return res.status(400).send(e.message);
        }
        return res.sendStatus(500);
    }
};

const searchConference = async (req: Request, res: Response): Promise<Response> => {
    try {
        return res.json(await conferenceService.searchConference(req.body));
    } catch (e) {
        return res.sendStatus(500);
    }
};

export {
    getAllConferences,
    createNewConference,
    searchConference,
};
