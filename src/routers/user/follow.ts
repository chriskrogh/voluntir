import express, { Response } from 'express';
import { Types } from 'mongoose';
import { RouteError } from '../../utils/exception';
import UserModel from "../../models/user";
import { AuthenticatedRequest } from '../../types/network';
import auth from '../../middleware/auth';
import * as M from '../../utils/errorMessages';

const router = express.Router();

router.patch('/follow', auth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.query;
    const user = await UserModel.findById(id);
    if(!user) {
      throw new RouteError(new Error(M.FIND_USER), 404);
    }
    // add to me to user's followers
    user.followers.push(req.user?._id);
    user.save();
    // add to user to my following
    const following = req.user?.following as Types.Array<Types.ObjectId>;
    following.push(Types.ObjectId(id as string));
    req.user?.save();
    res.send();

  } catch (exc) {
    console.log(exc);
    res.status(exc.status || 400).send(exc?.error?.message);
  }
});

router.patch('/unfollow', auth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.query;
    const user = await UserModel.findById(id);
    if(!user) {
      throw new RouteError(new Error(M.FIND_USER), 404);
    }
    // remove to me from user's followers
    user.followers.pull(req.user?._id);
    user.save();
    // add to user to my following
    const following = req.user?.following as Types.Array<Types.ObjectId>;
    following.pull(Types.ObjectId(id as string));
    req.user?.save();
    res.send();
  } catch (exc) {
    console.log(exc);
    res.status(exc.status || 400).send(exc?.error?.message);
  }
});

export default router;
