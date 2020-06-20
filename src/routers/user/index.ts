import express from 'express';
import Auth from './auth';
import Fetch from './fetch';
import Follow from './follow';
import Modify from './modify';

const router = express.Router();

router.use(Auth);
router.use(Fetch);
router.use(Follow);
router.use(Modify);

export default router;
