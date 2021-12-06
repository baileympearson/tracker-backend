import express, {NextFunction, Request, Response} from 'express';
import logger from 'morgan';
import { router as caffeineRouter } from './routes/caffeine.router'
import { router as healthcheckRouter } from './routes/healthcheck.router'

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/caffeine', caffeineRouter)
app.use('/healthcheck', healthcheckRouter)

export default app;
