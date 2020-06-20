import express, { Request, Response } from 'express';
import { RouteError } from '../../utils/exception';
import UserModel from "../../models/user";
import { AuthenticatedRequest } from '../../types/network';
import auth from '../../middleware/auth';
import * as M from '../../utils/errorMessages';

const router = express.Router();

// get me
router.get('/me', auth, async (req: AuthenticatedRequest, res: Response) => {
  res.send(req.user);
});

// get someone
router.get('/', auth, async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(req.query.id);
    if(!user) {
      throw new RouteError(new Error(M.FIND_USER), 404);
    }
    res.send(user);
  } catch (exc) {
    console.log(exc);
    res.status(exc.status || 400).send(exc?.error?.message);
  }
});

export default router;
