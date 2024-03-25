import stoppable from 'stoppable';
import logger from './logger';
import router from './routes';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import passport from 'passport';
import compression from 'compression';
import auth from './authentication';
import express from 'express';
import dotenv from 'dotenv';

const pino = require('pino-http')({
  // Use our default logger instance, which is already configured
  logger,
});
dotenv.config();

const app = express();
const port = process.env.PORT || 80;
app.use(pino);
app.use(helmet());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
app.use(cors());
app.use(router);
app.use(compression());

passport.use(auth.strat());

app.use(passport.initialize());


// Terminates the server gracefully
const server = app.listen(port, () =>
  logger.info(`Server running on port: [${port}]`),
);
stoppable(server);

export default app;
