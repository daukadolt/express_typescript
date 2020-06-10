import express, { Request, Response } from 'express';

import api from './routes';

const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => { res.send('App is working!'); });

app.use('/api', api);

export = app;
