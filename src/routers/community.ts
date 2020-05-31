import express, { Request, Response } from 'express';
import Community, { CommunityDoc } from "../models/community";
import { UserRequest } from '../types/network';
import auth from '../middleware/auth';
import * as M from '../utils/errorMessages';
import { Routes } from '../utils/constants';
import '../db/mongoose';

const router = express.Router();

router.post(Routes.COMMUNITY, auth, async (req: UserRequest, res: Response) => {
  try {
    const community = new Community({
      ...req.body,
      admins: [req.user?._id]
    });
    res.status(201).send({ community });
  } catch (err) {
    console.log(err);
    res.status(400).send(M.CREATE_COMMUNITY);
  }
});

export default router;