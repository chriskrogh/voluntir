import express, { Request, Response } from 'express';
import Community, { CommunityDoc } from "../models/community";
import * as M from '../utils/errorMessages';
import { Routes } from '../utils/constants';
import '../db/mongoose';

const router = express.Router();

router.post(Routes.COMMUNITY, async (req: Request, res: Response) => {
  try {
    const community = new Community(req.body);
    res.status(201).send({ community });
  } catch (err) {
    console.log(err);
    res.status(400).send(M.CREATE_COMMUNITY);
  }
});

export default router;