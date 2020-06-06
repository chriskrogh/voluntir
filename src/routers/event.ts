import express, { Request, Response } from 'express';
import { Types } from 'mongoose';
import Event, { EventDoc } from "../models/event";
import { CommunityDoc } from '../models/community';
import { AuthenticatedRequest } from '../types/network';
import auth from '../middleware/auth';
import * as M from '../utils/errorMessages';
import { Routes } from '../utils/constants';
import { isAdmin } from './utils';
import '../db/mongoose';

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
router.get(Routes.EVENT + '/:id', auth, async (req: Request, res: Response) => {
  try {
    const event = await Event.findById(req.params.id);
    if(!event) {
      res.status(404).send();
    } else {
      res.send(event);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(M.GET_EVENT);
  }
});

// update event
router.patch(Routes.EVENT + '/:id', auth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const updates = req.body as EventDoc;
    const event = await Event.findById(req.params.id);

    if (!event) {
      res.status(404).send();
    } else {
      await event.populate('community').execPopulate();
      if(!isAdmin(req.user?._id, event.community as CommunityDoc)) {
        throw new Error(M.ADMIN_UPDATE_EVENT);
      }

      Object.assign(event, updates);
      await event.save();
      res.send(event);
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

// delete event
router.delete(Routes.EVENT + '/:id', auth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      res.status(404).send();
    } else {
      await event.populate('community').execPopulate();
      if(!isAdmin(req.user?._id, event.community as CommunityDoc)) {
        throw new Error(M.ADMIN_DELETE_EVENT);
      }

      await event.remove();
      res.send();
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

router.patch(Routes.EVENT + '/attend/:id', auth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const event = await Event.findById(req.params.id);
    if(!event) {
      res.status(404).send();
    } else {
      event.attendees.push(req.user?._id);
      event.save();
      res.send();
    }
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});

router.patch(Routes.EVENT + '/unattend/:id', auth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const event = await Event.findById(req.params.id);
    if(!event) {
      res.status(404).send();
    } else {
      const attendees = event.attendees as Types.Array<Types.ObjectId>;
      attendees.pull(req.user?._id);
      event.save();
      res.send();
    }
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});

export default router;