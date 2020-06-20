import express, { Request, Response } from 'express';
import UserModel from "../../models/user";
import { AuthenticatedRequest } from '../../types/network';
import auth from '../../middleware/auth';

const router = express.Router();

// sign up
router.post('/signup', async (req: Request, res: Response) => {
  try {
    const user = new UserModel({
      ...req.body,
      followers: [],
      following: []
    });
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (exc) {
    console.log(exc);
    res.status(exc.status || 400).send(exc?.error?.message);
  }
});

// login
router.post('/', async (req: Request, res: Response) => {
  try {
    const { email, secret } = req.body;
    const user = await UserModel.findByCredentials(email, secret);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (exc) {
    console.log(exc);
    res.status(exc.status || 400).send(exc?.error?.message);
  }
});

router.post('/thirdPartyAuth', async (req: Request, res: Response) => {
  try {
    const { email, secret } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      const user = new UserModel({
        ...req.body,
        followers: [],
        following: []
      });
      const token = await user.generateAuthToken();
      res.status(201).send({ user, token });
    } else {
      const verifiedUser = await UserModel.validateSecret(user, secret);
      const token = await verifiedUser.generateAuthToken();
      res.send({ user: verifiedUser, token });
    }
  } catch (exc) {
    console.log(exc);
    res.status(exc.status || 400).send(exc?.error?.message);
  }
});

// logout
router.post('/logout', auth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      throw new Error();
    }
    req.user.tokens = req.user.tokens.filter(token => {
      return token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (exc) {
    console.log(exc);
    res.status(exc.status || 400).send(exc?.error?.message);
  }
});

// logout all
router.post('/logoutAll', auth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      throw new Error();
    }
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (exc) {
    console.log(exc);
    res.status(exc.status || 400).send(exc?.error?.message);
  }
});

export default router;
