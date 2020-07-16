import type { AuthenticatedRequest } from '../../types/network';
import type { RouteError } from '../../utils/exception';

import express, { Response } from 'express';
import { Types } from 'mongoose';
import Event from "../../models/event";
import auth from '../../middleware/auth';
import * as M from '../../utils/errorMessages';

const router = express.Router();

router.patch('/attend', auth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const event = await Event.findById(req.query.id);
    if (!event) {
      throw new RouteError(new Error(M.FIND_EVENT), 404);
    }
    event.attendees.push(req.user?._id);
    event.save();
    res.send();
  } catch (exc) {
    console.log(exc);
    res.status(exc.status || 400).send(exc?.error?.message);
  }
});

router.patch('/unattend', auth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const event = await Event.findById(req.query.id);
    if (!event) {
      throw new RouteError(new Error(M.FIND_EVENT), 404);
    }
    const attendees = event.attendees as Types.Array<Types.ObjectId>;
    attendees.pull(req.user?._id);
    event.save();
    res.send();
  } catch (exc) {
    console.log(exc);
    res.status(exc.status || 400).send(exc?.error?.message);
  }
});

export default router;
