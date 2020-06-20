import express, { Request, Response } from 'express';
import { RouteError } from '../../utils/exception';
import Community, { CommunityDoc } from "../../models/community";
import { AuthenticatedRequest } from '../../types/network';
import auth from '../../middleware/auth';
import MemberRoutes from './member';
import AdminRoutes from './admin';
import { isAdmin } from '../utils';
import * as M from '../../utils/errorMessages';

const router = express.Router();

router.use(MemberRoutes);
router.use(AdminRoutes);

// create community
router.post('/', auth, async (req: AuthenticatedRequest, res: Response) => {
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
router.get('/', auth, async (req: Request, res: Response) => {
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
router.patch('/', auth, async (req: AuthenticatedRequest, res: Response) => {
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
router.delete('/', auth, async (req: AuthenticatedRequest, res: Response) => {
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

export default router;
