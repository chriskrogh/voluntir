import express, { Request, Response } from 'express';
import { Types } from 'mongoose';
import UserModel, { UserDoc } from "../models/user";
import { AuthenticatedRequest } from '../types/network';
import auth from '../middleware/auth';
import { Routes } from '../utils/constants';
import * as M from '../utils/errorMessages';
import '../db/mongoose';

const router = express.Router();

// sign up
router.post(Routes.USER + '/signup', async (req: Request, res: Response) => {
  try {
    const user = new UserModel({
      ...req.body,
      followers: [],
      following: []
    });
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (err) {
    console.log(err);
    res.status(400).send(M.SIGN_UP);
  }
});

// login
router.post(Routes.USER, async (req: Request, res: Response) => {
  try {
    const { email, secret } = req.body;
    const user = await UserModel.findByCredentials(email, secret);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (err) {
    console.log(err);
    res.status(400).send(M.LOGIN);
  }
});

router.post(Routes.USER + '/thirdPartyAuth', async (req: Request, res: Response) => {
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
  } catch (error) {
    console.log(error);
    res.status(400).send(M.LOGIN);
  }
});

// logout
router.post(Routes.USER + '/logout', auth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (req.user == null) {
      throw new Error();
    }
    req.user.tokens = req.user.tokens.filter(token => {
      return token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

// logout all
router.post(Routes.USER + '/logoutAll', auth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (req.user == null) {
      throw new Error();
    }
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

// get me
router.get(Routes.USER + '/me', auth, async (req: AuthenticatedRequest, res: Response) => {
  res.send(req.user);
});

// get someone
router.get(Routes.USER, auth, async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(req.query.id);
    if (!user) {
      throw new Error('User not found');
    }
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(404).send();
  }
});

// get avatar
router.get(Routes.USER + '/picture', async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(req.query.id);
    if (!user || !user.picture) {
      throw new Error;
    }
    res.set('Content-Type', 'image/png');
    res.send(user.picture);
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
});

// update me
router.patch(Routes.USER + '/me', auth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const source = req.body as UserDoc;
    if (!req.user) throw new Error();
    const user = Object.assign(req.user, source);
    await user.save();
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
});

// update someone
router.patch(Routes.USER, auth, async (req: Request, res: Response) => {
  const source = req.body as UserDoc;
  try {
    const user = await UserModel.findById(req.query.id);
    if (!user) {
      throw new Error('Could not find user');
    }

    Object.assign(user, source);

    await user.save();
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
});

// delete me
router.delete(Routes.USER + '/me', auth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) throw new Error();
    await req.user.remove();
    res.send(req.user);
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
});

// delete someone
router.delete(Routes.USER, auth, async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(req.query.id);
    if (user) {
      await user.remove();
    }
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
});

router.patch(Routes.USER + '/follow', auth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.query;
    const user = await UserModel.findById(id);
    if(!user) {
      res.status(404).send();
    } else {
      // add to me to user's followers
      user.followers.push(req.user?._id);
      user.save();
      // add to user to my following
      const following = req.user?.following as Types.Array<Types.ObjectId>;
      following.push(Types.ObjectId(id as string));
      req.user?.save();
      res.send();
    }
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
});

router.patch(Routes.USER + '/unfollow', auth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.query;
    const user = await UserModel.findById(id);
    if(!user) {
      res.status(404).send();
    } else {
      // remove to me from user's followers
      user.followers.pull(req.user?._id);
      user.save();
      // add to user to my following
      const following = req.user?.following as Types.Array<Types.ObjectId>;
      following.pull(Types.ObjectId(id as string));
      req.user?.save();
      res.send();
    }
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
});

export default router;
