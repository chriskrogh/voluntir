import express, { Response } from 'express';
import { Types } from 'mongoose';
import { RouteError } from '../../utils/exception';
import Community from "../../models/community";
import { AuthenticatedRequest } from '../../types/network';
import auth from '../../middleware/auth';
import { isAdmin } from '../utils';
import * as M from '../../utils/errorMessages';

const router = express.Router();

router.patch('/add/admin', auth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { userId } = req.body;
    const community = await Community.findById(req.query.id);
    if(!userId) throw new RouteError(new Error('User id not specified'));
    if(!community) {
      throw new RouteError(new Error(M.FIND_COMMUNITY), 404);
    }
    if(!isAdmin(req.user?._id, community)) {
      throw new RouteError(new Error('Only admins can add other admins'), 403);
    }
    community.members.pull(Types.ObjectId(userId));
    community.admins.push(userId);
    community.save();
    res.send();
  } catch (exc) {
    console.log(exc);
    res.status(exc.status || 400).send(exc?.error?.message);
  }
});

router.patch('/remove/admin', auth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { userId } = req.body;
    const community = await Community.findById(req.query.id);
    if(!userId) throw new RouteError(new Error('User id not specified'));
    if(!community) {
      throw new RouteError(new Error(M.FIND_COMMUNITY), 404);
    }
    if(!isAdmin(req.user?._id, community)) {
      throw new RouteError(new Error('Only admins can add other admins'), 403);
    }
    community.admins.pull(userId);
    community.save();
    res.send();
  } catch (exc) {
    console.log(exc);
    res.status(exc.status || 400).send(exc?.error?.message);
  }
});

export default router;
