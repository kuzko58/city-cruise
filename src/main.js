import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import routes from './routes/routes.js';
import { startMongoDB } from './db/mongo.db.js';

config();

const init = async () => {
  try {
    const app = express();

    const port = process.env.PORT || 6500;

    await startMongoDB();

    const whitelist = [process.env.CLIENT_URL];

    const corsOptions = {
      origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
    };

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(cors(corsOptions));

    app.use(routes.router);

    app.listen(port, () => {
      console.info(`server started on port: ${port}`);
    });
  } catch (err) {
    console.error(err);
  }
};

init();
