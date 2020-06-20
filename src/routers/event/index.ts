import /*type*/ { AuthenticatedRequest } from '../../types/network';
import /*type*/ { RouteError } from '../../utils/exception';

import express, { Request, Response } from 'express';
import Event, { EventDoc } from "../../models/event";
import { CommunityDoc } from '../../models/community';
import auth from '../../middleware/auth';
import HomeRouter from './home';
import AttendRouter from './attend';
import { isAdmin } from '../utils';
import * as M from '../../utils/errorMessages';

const router = express.Router();

router.use(HomeRouter);
router.use(AttendRouter);

// create event
router.post('/', auth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const event = new Event({
      ...req.body,
      admins: [ req.user?._id ],
      attendees: []
    });
    await event.save();
    res.status(201).send(event);
  } catch (error) {
    console.log(error);
    res.status(400).send(M.CREATE_EVENT);
  }
});

// get event by id
router.get('/', auth, async (req: Request, res: Response) => {
  try {
    const event = await Event.findById(req.query.id);
    if(!event) {
      throw new RouteError(new Error(M.FIND_EVENT), 404);
    }
    res.send(event);
  } catch (exc) {
    console.log(exc);
    res.status(exc.status || 400).send(exc?.error?.message);
  }
});

// update event
router.patch('/', auth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const updates = req.body as EventDoc;
    const event = await Event.findById(req.query.id);
    if (!event) {
      throw new RouteError(new Error(M.FIND_EVENT), 404);
    }
    await event.populate('community').execPopulate();
    if(!isAdmin(req.user?._id, event.community as CommunityDoc)) {
      throw new RouteError(new Error(M.ADMIN_UPDATE_EVENT), 403);
    }
    Object.assign(event, updates);
    await event.save();
    res.send(event);
  } catch (exc) {
    console.log(exc);
    res.status(exc.status || 400).send(exc?.error?.message);
  }
});

// delete event
router.delete('/', auth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const event = await Event.findById(req.query.id);
    if (!event) {
      throw new RouteError(new Error(M.FIND_EVENT), 404);
    }
    await event.populate('community').execPopulate();
    if(!isAdmin(req.user?._id, event.community as CommunityDoc)) {
      throw new RouteError(new Error(M.ADMIN_DELETE_EVENT), 403);
    }
    await event.remove();
    res.send();
  } catch (exc) {
    console.log(exc);
    res.status(exc.status || 400).send(exc?.error?.message);
  }
});

export default router;
