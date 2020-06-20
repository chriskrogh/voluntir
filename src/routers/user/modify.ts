import express, { Request, Response } from 'express';
import { RouteError } from '../../utils/exception';
import UserModel, { UserDoc } from "../../models/user";
import { AuthenticatedRequest } from '../../types/network';
import auth from '../../middleware/auth';
import * as M from '../../utils/errorMessages';

const router = express.Router();

// update me
router.patch('/me', auth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const source = req.body as UserDoc;
    if (!req.user) throw new Error();
    const user = Object.assign(req.user, source);
    await user.save();
    res.send(user);
  } catch (exc) {
    console.log(exc);
    res.status(exc.status || 400).send(exc?.error?.message);
  }
});

// update someone
router.patch('/', auth, async (req: Request, res: Response) => {
  const source = req.body as UserDoc;
  try {
    const user = await UserModel.findById(req.query.id);
    if(!user) {
      throw new RouteError(new Error(M.FIND_USER), 404);
    }
    Object.assign(user, source);
    await user.save();
    res.send(user);
  } catch (exc) {
    console.log(exc);
    res.status(exc.status || 400).send(exc?.error?.message);
  }
});

// delete me
router.delete('/me', auth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) throw new Error();
    await req.user.remove();
    res.send(req.user);
  } catch (exc) {
    console.log(exc);
    res.status(exc.status || 400).send(exc?.error?.message);
  }
});

// delete someone
router.delete('/', auth, async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(req.query.id);
    if(!user) {
      throw new RouteError(new Error(M.FIND_USER), 404);
    }
    await user.remove();
    res.send(user);
  } catch (exc) {
    console.log(exc);
    res.status(exc.status || 400).send(exc?.error?.message);
  }
});

export default router;
