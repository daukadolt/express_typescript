import express from 'express';

import api from './routes';

const app = express();

app.use(express.json());

app.use(api);

export default app;
