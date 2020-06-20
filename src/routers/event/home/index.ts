import /*type*/ { AuthenticatedRequest } from '../../../types/network';
import /*type*/ { RouteError } from '../../../utils/exception';

import express, { Response } from 'express';
import Event from "../../../models/event";
import auth from '../../../middleware/auth';
import { paginateAggregate } from '../utils';
import { getJoinedCommunityIds, queryAggregate } from './utils';
import * as M from '../../../utils/errorMessages';

const router = express.Router();

router.get('/new', auth, async (req: AuthenticatedRequest, res: Response) => {
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
      ...queryAggregate(joinedCommunityIds, user),
      {
        $sort: { createdAt: -1 }
      },
      ...paginateAggregate(page)
    ]);
    res.send(events);
  } catch (exc) {
    console.log(exc);
    res.status(exc.status || 400).send(exc?.error?.message);
  }
});

router.get('/upcoming', auth, async (req: AuthenticatedRequest, res: Response) => {
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
      ...queryAggregate(joinedCommunityIds, user),
      {
        $match: {
          start: { $gte: new Date() }
        }
      },
      {
        $sort: { start: 1 }
      },
      ...paginateAggregate(page)
    ]);
    res.send(events);
  } catch (exc) {
    console.log(exc);
    res.status(exc.status || 400).send(exc?.error?.message);
  }
});

router.get('/recent', auth, async (req: AuthenticatedRequest, res: Response) => {
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
      ...queryAggregate(joinedCommunityIds, user),
      {
        $match: {
          start: { $lt: new Date() }
        }
      },
      {
        $sort: { start: -1 }
      },
      ...paginateAggregate(page)
    ]);
    res.send(events);
  } catch (exc) {
    console.log(exc);
    res.status(exc.status || 400).send(exc?.error?.message);
  }
});

export default router;
