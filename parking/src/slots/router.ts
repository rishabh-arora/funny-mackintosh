import express from 'express';
import { acquire, release } from './controller';

const router = express.Router();

router.route('/').post(acquire);
router.route('/:id').put(release);

export default router;
