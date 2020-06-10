import express from 'express';

import conferenceRoute from './conference-route';

const router = express.Router();

router.use('/conference', conferenceRoute);

export = router;

