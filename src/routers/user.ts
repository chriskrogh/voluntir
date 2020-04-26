import express, { Request, Response } from 'express';
import { UserModel, UserData } from "../models/user";
import { LOGIN, ME } from '../common/errorMessages';
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
        res.status(201).send(await createUser(req.body));
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
            res.status(200).send(users[0]);
        } else if (req.body.fromThirdParty) {
            res.status(201).send(await createUser(req.body));
        } else {
            throw new Error(LOGIN + req.body.email);
        }
    } catch (err) {
        console.log(err);
        res.status(400).send();
    }
});

// get me
router.get('/api/users/me', async (req: Request, res: Response) => {
    try {
        const user = await UserModel.find({ email: req.body.email });
        if (!user) {
            throw new Error(ME + req.body.email);
        }
        res.send(user);
    } catch (err) {
        console.log(err);
        res.status(404).send();
    }
});

export default router;