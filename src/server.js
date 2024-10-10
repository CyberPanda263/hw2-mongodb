import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { ENV_VARS } from './constans/index.js';
import { notFoundRoute, errorhandler } from './middlewares/index.js';
import router from './routes/index.js';
import cookieParser from 'cookie-parser';

const PORT = env(ENV_VARS.PORT, 3000);


export const setupServer = () => {


    const app = express();

    app.use(pino(
        {
            transport: {
                target: 'pino-pretty',
            }
        }
    ));

    app.use(cors());

    app.use(cookieParser());

    app.use(express.json());

    app.use(router);

    app.use(notFoundRoute);
    app.use(errorhandler);

    app.listen(3000, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};
