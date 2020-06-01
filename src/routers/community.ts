import express, { Request, Response } from 'express';
import { Types } from 'mongoose';
import Community, { CommunityDoc } from "../models/community";
import { AuthenticatedRequest } from '../types/network';
import auth from '../middleware/auth';
import * as M from '../utils/errorMessages';
import { Routes } from '../utils/constants';
import '../db/mongoose';

const router = express.Router();

const isAdmin = (userId: Types.ObjectId, community: CommunityDoc) => {
  for(const adminId of community.admins) {
    if(adminId.equals(userId)) {
      return true;
    }
  }
  return false;
}

// create community
router.post(Routes.COMMUNITY, auth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const community = new Community({
      ...req.body,
      admins: [req.user?._id]
    });
    await community.save();
    res.status(201).send(community);
  } catch (error) {
    console.log(error);
    res.status(400).send(M.CREATE_COMMUNITY);
  }
});

// get community by id
router.get(Routes.COMMUNITY + '/:id', auth, async (req: Request, res: Response) => {
  try {
    const community = await Community.findById(req.params.id);
    if(!community) {
      res.status(404).send();
    } else {
      res.send(community);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(M.GET_COMMUNITY);
  }
});

// update community
router.patch(Routes.COMMUNITY + '/:id', auth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const updates = req.body as CommunityDoc;
    const community = await Community.findById(req.params.id);

    if (!community) {
      res.status(404).send();
    } else {
      if(!isAdmin(req.user?._id, community)) {
        throw new Error(M.ADMIN_UPDATE_COMMUNITY);
      }

      Object.assign(community, updates);
      await community.save();
      res.send(community);
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

// delete community
router.delete(Routes.COMMUNITY + '/:id', auth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const community = await Community.findById(req.params.id);
    if (!community) {
      res.status(404).send();
    } else {
      if(!isAdmin(req.user?._id, community)) {
        throw new Error(M.ADMIN_DELETE_COMMUNITY);
      }

      await community.remove();
      res.send();
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

export default router;