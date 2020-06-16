import /*type*/ { AuthenticatedRequest } from '../../types/network';
import /*type*/ { RouteError } from '../../utils/exception';

import express, { Request, Response } from 'express';
import { Types } from 'mongoose';
import Event, { EventDoc } from "../../models/event";
import { CommunityDoc } from '../../models/community';
import auth from '../../middleware/auth';
import { Routes } from '../../utils/constants';
import { isAdmin } from '../utils';
import { homeAggregateQuery, getJoinedCommunityIds } from './utils';
import * as M from '../../utils/errorMessages';
import '../../db/mongoose';

const DOC_QUERY_LIMIT = 1000;
const NUM_EVENTS_IN_PAGE = 10;

const router = express.Router();

// create event
router.post(Routes.EVENT, auth, async (req: AuthenticatedRequest, res: Response) => {
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
router.get(Routes.EVENT, auth, async (req: Request, res: Response) => {
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
router.patch(Routes.EVENT, auth, async (req: AuthenticatedRequest, res: Response) => {
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
router.delete(Routes.EVENT, auth, async (req: AuthenticatedRequest, res: Response) => {
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

router.patch(Routes.EVENT + '/attend', auth, async (req: AuthenticatedRequest, res: Response) => {
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

router.patch(Routes.EVENT + '/unattend', auth, async (req: AuthenticatedRequest, res: Response) => {
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

router.get(Routes.EVENT + '/home/new', auth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = req.user;
    if(!user) {
      throw new RouteError(new Error(M.FETCH_ME));
    }
    const page = parseInt(req.query.page as string);
    if(page == null || isNaN(page)) {
      throw new RouteError(new Error(M.MISSING_PAGE));
    }
    const joinedCommunityIds = await getJoinedCommunityIds(user);
    const events = await Event.aggregate([
      ...homeAggregateQuery(joinedCommunityIds, user),
      {
        $limit: DOC_QUERY_LIMIT
      },
      {
        $sort: { createdAt: -1 }
      }
    ]);
    res.send(events.slice(page * NUM_EVENTS_IN_PAGE, (page + 1) * NUM_EVENTS_IN_PAGE));
  } catch (exc) {
    console.log(exc);
    res.status(exc.status || 400).send(exc?.error?.message);
  }
});

router.get(Routes.EVENT + '/home/upcoming', auth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = req.user;
    if(!user) {
      throw new RouteError(new Error(M.FETCH_ME));
    }
    const page = parseInt(req.query.page as string);
    if(page == null || isNaN(page)) {
      throw new RouteError(new Error(M.MISSING_PAGE));
    }
    const joinedCommunityIds = await getJoinedCommunityIds(user);
    const events = await Event.aggregate([
      ...homeAggregateQuery(joinedCommunityIds, user),
      {
        $match: {
          start: { $gte: new Date() }
        }
      },
      {
        $limit: DOC_QUERY_LIMIT
      },
      {
        $sort: { start: 1 }
      }
    ]);
    res.send(events.slice(page * NUM_EVENTS_IN_PAGE, (page + 1) * NUM_EVENTS_IN_PAGE));
  } catch (exc) {
    console.log(exc);
    res.status(exc.status || 400).send(exc?.error?.message);
  }
});

router.get(Routes.EVENT + '/home/recent', auth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = req.user;
    if(!user) {
      throw new RouteError(new Error(M.FETCH_ME));
    }
    const page = parseInt(req.query.page as string);
    if(page == null || isNaN(page)) {
      throw new RouteError(new Error(M.MISSING_PAGE));
    }
    const joinedCommunityIds = await getJoinedCommunityIds(user);
    const events = await Event.aggregate([
      ...homeAggregateQuery(joinedCommunityIds, user),
      {
        $match: {
          start: { $lt: new Date() }
        }
      },
      {
        $limit: DOC_QUERY_LIMIT
      },
      {
        $sort: { start: -1 }
      }
    ]);
    res.send(events.slice(page * NUM_EVENTS_IN_PAGE, (page + 1) * NUM_EVENTS_IN_PAGE));
  } catch (exc) {
    console.log(exc);
    res.status(exc.status || 400).send(exc?.error?.message);
  }
});

export default router;
