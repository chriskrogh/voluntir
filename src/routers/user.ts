import express, { Request, Response } from 'express';
import UserModel, { UserDoc } from "../models/user";
import { UserRequest } from '../types/network';
import auth from '../middleware/auth';
import * as M from '../utils/errorMessages';
import '../db/mongoose';

const router = express.Router();

// create / sign up
router.post('/api/users/signup', async (req: Request, res: Response) => {
    try {
        const user = new UserModel(req.body);
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (err) {
        console.log(err);
        res.status(400).send(M.EXISTING_USER);
    }
});

// login
router.post('/api/users', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findByCredentials(email, password);
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (err) {
        console.log(err);
        res.status(400).send();
    }
});

// logout
router.post('/api/users/logout', auth, async (req: UserRequest, res: Response) => {
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
router.post('/api/users/logoutAll', auth, async (req: UserRequest, res: Response) => {
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

// get you
router.get('/api/users/me', auth, async (req: UserRequest, res: Response) => {
    res.send(req.user);
});

// get someone
router.get('/api/users', auth, async (req: UserRequest, res: Response) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });
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
router.get('/api/users/:id/picture', async (req: Request, res: Response) => {
    try {
        const user = await UserModel.findById(req.params.id);
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

// update
router.patch('/api/users/me', auth, async (req: UserRequest, res: Response) => {
    const source = req.body as UserDoc;
    try {
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
router.patch('/api/users/:id', auth, async (req: Request, res: Response) => {
    const source = req.body as UserDoc;
    try {
        const user = await UserModel.findById(req.params.id);
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

// delete user
router.delete('/api/users/:id', auth, async (req: Request, res: Response) => {
    try {
        const user = await UserModel.findById(req.params.id);
        if (user != null) {
            await user.remove();
        }
        res.send(user);
    } catch (err) {
        console.log(err);
        res.status(400).send();
    }
});

export default router;