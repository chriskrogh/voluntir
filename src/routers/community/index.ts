import express, { Request, Response } from 'express';
import { Types } from 'mongoose';
import { RouteError } from '../../utils/exception';
import Community, { CommunityDoc } from "../../models/community";
import { AuthenticatedRequest } from '../../types/network';
import auth from '../../middleware/auth';
import * as M from '../../utils/errorMessages';
import { Routes } from '../../utils/constants';
import { isAdmin } from '../utils';
import '../../db/mongoose';

const router = express.Router();

// create community
router.post(Routes.COMMUNITY, auth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const community = new Community({
      ...req.body,
      admins: [ req.user?._id ],
      members: []
    });
    await community.save();
    res.status(201).send(community);
  } catch (error) {
    console.log(error);
    res.status(400).send(M.CREATE_COMMUNITY);
  }
});

// get community by id
router.get(Routes.COMMUNITY, auth, async (req: Request, res: Response) => {
  try {
    const community = await Community.findById(req.query.id);
    if(!community) {
      throw new RouteError(new Error(M.FIND_COMMUNITY), 404);
    }
    res.send(community);
  } catch (exc) {
    console.log(exc);
    res.status(exc.status || 400).send(exc?.error?.message);
  }
});

// update community
router.patch(Routes.COMMUNITY, auth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const updates = req.body as CommunityDoc;
    const community = await Community.findById(req.query.id);
    if(!community) {
      throw new RouteError(new Error(M.FIND_COMMUNITY), 404);
    }
    if(!isAdmin(req.user?._id, community)) {
      throw new RouteError(new Error(M.ADMIN_UPDATE_COMMUNITY), 403);
    }
    Object.assign(community, updates);
    await community.save();
    res.send(community);
  } catch (exc) {
    console.log(exc);
    res.status(exc.status || 400).send(exc?.error?.message);
  }
});

// delete community
router.delete(Routes.COMMUNITY, auth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const community = await Community.findById(req.query.id);
    if(!community) {
      throw new RouteError(new Error(M.FIND_COMMUNITY), 404);
    }
    if(!isAdmin(req.user?._id, community)) {
      throw new RouteError(new Error(M.ADMIN_DELETE_COMMUNITY), 403);
    }
    await community.remove();
    res.send();
  } catch (exc) {
    console.log(exc);
    res.status(exc.status || 400).send(exc?.error?.message);
  }
});

router.patch(Routes.COMMUNITY + '/add/admin', auth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { userId } = req.body;
    const community = await Community.findById(req.query.id);
    if(!userId) throw new RouteError(new Error('User id not specified'));
    if(!community) {
      throw new RouteError(new Error(M.FIND_COMMUNITY), 404);
    }
    if(!isAdmin(req.user?._id, community)) {
      throw new RouteError(new Error(M.ADMIN_UPDATE_COMMUNITY), 403);
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

router.patch(Routes.COMMUNITY + '/remove/admin', auth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { userId } = req.body;
    const community = await Community.findById(req.query.id);
    if(!userId) throw new RouteError(new Error('User id not specified'));
    if(!community) {
      throw new RouteError(new Error(M.FIND_COMMUNITY), 404);
    }
    if(!isAdmin(req.user?._id, community)) {
      throw new RouteError(new Error(M.ADMIN_UPDATE_COMMUNITY), 403);
    }
    community.admins.pull(userId);
    community.save();
    res.send();
  } catch (exc) {
    console.log(exc);
    res.status(exc.status || 400).send(exc?.error?.message);
  }
});

router.patch(Routes.COMMUNITY + '/add/member', auth, async (req: AuthenticatedRequest, res: Response) => {
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

router.patch(Routes.COMMUNITY + '/remove/member', auth, async (req: AuthenticatedRequest, res: Response) => {
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
