import express, { Response } from 'express';
import { RouteError } from '../../utils/exception';
import Community from "../../models/community";
import { AuthenticatedRequest } from '../../types/network';
import auth from '../../middleware/auth';
import * as M from '../../utils/errorMessages';

const router = express.Router();

router.patch('/add/member', auth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const community = await Community.findById(req.query.id);
    if(!community) {
      throw new RouteError(new Error(M.FIND_COMMUNITY), 404);
    }
    community.members.push(req.user?._id);
    community.save();
    res.send();
  } catch (exc) {
    console.log(exc);
    res.status(exc.status || 400).send(exc?.error?.message);
  }
});

router.patch('/remove/member', auth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const community = await Community.findById(req.query.id);
    if(!community) {
      throw new RouteError(new Error(M.FIND_COMMUNITY), 404);
    }
    community.members.pull(req.user?._id);
    community.save();
    res.send();
  } catch (exc) {
    console.log(exc);
    res.status(exc.status || 400).send(exc?.error?.message);
  }
});

export default router;
