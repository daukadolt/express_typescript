import 'dotenv/config';

import mongoose from 'mongoose';
import app from './app';

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_PROD_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        const expressPort = process.env.EXPRESS_PORT;
        app.listen(expressPort, () => {
            console.log(`Yeti is up and running on port ${expressPort}`);
        });
    } catch (e) {
        console.error(e.stack);
        process.exit(1);
    }
};

start();
