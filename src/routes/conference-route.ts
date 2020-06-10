import express from 'express';
import { conferenceController } from '../controllers';

const router = express.Router();

router.get('/all', conferenceController.getAllConferences);

router.post('/new', conferenceController.createNewConference);

router.post('/search', conferenceController.searchConference);

export = router;
