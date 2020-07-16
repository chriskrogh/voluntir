import type { AuthenticatedRequest } from '../../types/network';
import type { RouteError } from '../../utils/exception';

import express, { Request, Response } from 'express';
import Event, { EventDoc } from "../../models/event";
import { CommunityDoc } from '../../models/community';
import auth from '../../middleware/auth';
import AttendRouter from './attend';
import HomeRouter from './home';
import ExploreRouter from './explore';
import { isAdmin } from '../utils';
import events from '../../data/events';
import * as M from '../../utils/errorMessages';

const router = express.Router();

router.use(AttendRouter);
router.use('/home', HomeRouter);
router.use('/explore', ExploreRouter);

// create event
router.post('/', auth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const event = new Event({
      ...req.body,
      location: { type: 'Point', coordinates: req.body.location },
      attendees: []
    });
    await event.save();
    res.status(201).send(event);
  } catch (error) {
    console.log(error);
    res.status(400).send('Could not create event');
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
      throw new RouteError(new Error('Only admins can update events'), 403);
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
      throw new RouteError(new Error('Only admins can delete events'), 403);
    }
    await event.remove();
    res.send();
  } catch (exc) {
    console.log(exc);
    res.status(exc.status || 400).send(exc?.error?.message);
  }
});

// THIS ROUTE IS USED TO POPULATE THE DB WITH DUMMY DATA
router.post('/populate', async (req: Request, res: Response) => {
  try {
    events.forEach(async event => {
      const eventDoc = new Event({
        ...event,
        location: {
          type: 'Point',
          coordinates: event.coordinates
        }
      });
      await eventDoc.save();
    });
    res.send();
  } catch (exc) {
    console.log(exc);
    res.status(exc.status || 400).send(exc?.error?.message);
  }
});

export default router;
