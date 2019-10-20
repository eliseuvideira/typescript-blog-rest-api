import express from 'express';

import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';

import AuthRouter from './routes/auth';

import ErrorMiddleware from './middlewares/error';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(AuthRouter);

app.use(ErrorMiddleware.notFoundHandler());
app.use(ErrorMiddleware.exceptionHandler());

export default app;
