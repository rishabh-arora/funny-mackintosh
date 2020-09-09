import express from 'express';
import { events } from './controller';

const router = express.Router();

router.route('/').get(events);

export default router;
