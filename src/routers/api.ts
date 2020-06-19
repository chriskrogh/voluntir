import express from 'express';
import { Routes } from '../utils/constants';
import UserRouter from './user';
import MediaRouter from './media';
import CommunityRouter from './community';
import EventRouter from './event';

const router = express.Router();

router.use(Routes.USER, UserRouter);
router.use(Routes.MEDIA, MediaRouter);
router.use(Routes.COMMUNITY, CommunityRouter);
router.use(Routes.EVENT, EventRouter);

export default router;
