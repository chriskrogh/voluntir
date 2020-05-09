import express, { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import { UserModel, UserData } from "../models/user";
import * as M from '../common/errorMessages';
import '../db/mongoose';

const router = express.Router();

const createUser = async (data: UserData) => {
    const user = new UserModel(data);
    await user.save();
    return user;
}

// sign up
router.post('/api/users/signup', async (req: Request, res: Response) => {
    try {
        const users = await UserModel.find({ email: req.body.email });
        if (users.length > 0) {
            throw new Error(M.EXISTING_USER);
        } else {
            const hash = await bcryptjs.hash(req.body.secret, 8);
            res.status(201).send(await createUser({ ...req.body, secret: hash }));
        }
    } catch (err) {
        console.log(err);
        res.status(400).send();
    }
});

// login
router.post('/api/users', async (req: Request, res: Response) => {
    try {
        const users = await UserModel.find({ email: req.body.email });
        if (users.length > 0) {
            const user = users[0];
            const successfulComparison = await bcryptjs.compare(req.body.secret, user.secret);
            if (successfulComparison) {
                res.status(200).send(user);
            } else {
                throw new Error(M.LOGIN + req.body.email);
            }
        } else if (req.body.fromThirdParty) {
            res.status(201).send(await createUser(req.body));
        } else {
            throw new Error(M.LOGIN + req.body.email);
        }
    } catch (err) {
        console.log(err);
        res.status(400).send();
    }
});

// get me
router.get('/api/users/me', async (req: Request, res: Response) => {
    try {
        const user = await UserModel.findById(req.query.id);
        if (!user) {
            throw new Error(M.ME + req.body.email);
        }
        res.send(user);
    } catch (err) {
        console.log(err);
        res.status(404).send();
    }
});

export default router;