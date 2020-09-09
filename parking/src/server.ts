import dotenv from 'dotenv';
import morgan from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';
import { logger } from '../../dev';
import echo from './echo/router';
import history from './history/router';
import slots from './slots/router';
import amqp from 'amqplib/callback_api';
import cors from 'cors';

/* setup config */
dotenv.config({ path: './config/config.env' });
const SERVICE_NAME = process.env.SERVICE_NAME!;

/* setup logger */
export const log = logger(SERVICE_NAME);
log.debug(`pwd: ${process.cwd()}`);

const app = express();
const API_VERSION = process.env.API_VERSION;

/* setup middleware */
app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(cors());
/* mount endpoints, routers */
app.use(`/${API_VERSION}/echo`, echo);
app.use(`/${API_VERSION}/lots/1/slots`, slots);
app.use(`/${API_VERSION}/history`, history);

const PORT = process.env.PORT || 5000;
let ch;

amqp.connect('amqp://localhost', (err, connection) => {
  if (err) throw err;
  connection.createChannel((err, channel) => {
    log.info(`Connected to broker`);
    ch = channel;
    const global = 'global';

    channel.assertExchange('global', 'fanout', { durable: false });
    if (err) throw err;

    channel.assertQueue(SERVICE_NAME, {
      durable: false,
    });

    channel.bindQueue(SERVICE_NAME, global, '');
    channel.consume(SERVICE_NAME, msg => onMessage(msg), {
      noAck: true,
    });

    channel.publish('global', '', Buffer.from('Producer Check'));

    app.listen(PORT, () => {
      log.info(`Server started: mode ${process.env.NODE_ENV}, port: ${PORT}`);
    });
  });
});

process.on('unhandledRejection', (err: any, promise) => {
  log.info(`Error: ${err!.message}`);
});

export const onMessage = msg => {
  // UserService.onMessage(msg);
  // FriendshipService.onMessage(msg);
};

export const produce = (msg: any) => {
  if (ch) ch.publish('global', '', Buffer.from(JSON.stringify(msg)));
};
