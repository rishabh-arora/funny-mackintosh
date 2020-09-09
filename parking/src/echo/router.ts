import express from 'express';
import { echo } from './controller';

const router = express.Router();
router.route('/').get(echo);

export default router;
