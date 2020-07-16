import type { AuthenticatedRequest } from '../../../types/network';
import type { RouteError } from '../../../utils/exception';
import type { GeoJSON } from '../../../types/location';

import express, { Response } from 'express';
import Event from "../../../models/event";
import auth from '../../../middleware/auth';
import { paginateAggregate } from '../utils';
import * as M from '../../../utils/errorMessages';

const router = express.Router();

router.get('/new', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const lat = parseFloat(req.query.lat as string);
    const lng = parseFloat(req.query.lng as string);
    if(lat == null || isNaN(lat) || lng == null || isNaN(lng)) {
      throw new RouteError(new Error('Bad coordinates'), 422);
    }

    const page = parseInt(req.query.page as string);
    if(page == null || isNaN(page)) {
      throw new RouteError(new Error(M.MISSING_PAGE), 442);
    }

    const events = await Event.aggregate([
      {
        $geoNear: {
          near: { type: 'Point', coordinates: [ lng , lat ] } as GeoJSON,
          distanceField: 'dist',
          spherical: true
        }
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
    const events = await Event.aggregate([
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

router.get('/completed', auth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = req.user;
    if(!user) {
      throw new RouteError(new Error(M.FETCH_ME));
    }
    const page = parseInt(req.query.page as string);
    if(page == null || isNaN(page)) {
      throw new RouteError(new Error(M.MISSING_PAGE));
    }
    const events = await Event.aggregate([
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
