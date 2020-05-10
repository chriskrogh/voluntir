import express, { Request, Response } from 'express';
import { UserRequest } from '../types/network';
import MediaModel, { MediaDoc } from '../models/media';
import upload from '../utils/upload';
import auth from '../middleware/auth';
import compress from '../utils/compress';
import blobService from '../utils/blobstorage';
import { PassThrough } from 'stream';
import '../db/mongoose';

const router = express.Router();

const containerName = process.env.NODE_ENV === 'production' ? 'prod-media' : 'media';

// set media
router.post(
    '/api/media',
    auth,
    upload.single('media'),
    async (req: UserRequest, res: Response) => {
        try {
            await blobService.createContainerIfDoesNotExist(containerName);
            if (!req.file || !req.file.buffer) throw new Error;

            const newBuffer = await compress(req.file.buffer);
            const media = new MediaModel({ ...req.body });

            await blobService.uploadString(containerName, media._id + '.jpg', newBuffer);
            await media.save();
            res.status(201).send();
        } catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    }
);

// get media by id
router.get('/api/media/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const stream = new PassThrough();
        const data: Uint8Array[] = [];

        stream.on('data', d => data.push(d));
        await blobService.downloadBlob(containerName, id + '.jpg', stream);
        const mergedBuffer = Buffer.concat(data);

        res.set('Content-Type', 'image/jpg');
        res.send(mergedBuffer);
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

// update media
router.patch('/api/media/:id', auth, async (req: Request, res: Response) => {
    const updates = req.body as MediaDoc;
    try {
        const media = await MediaModel.findById(req.params.id);
        if (!media) {
            throw new Error;
        }

        Object.assign(media, updates);

        await media.save();
        res.send(media);
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

// delete media
router.delete('/api/media/:id', auth, async (req: UserRequest, res: Response) => {
    try {
        const media = await MediaModel.findById(req.params.id);
        if (!media) {
            throw new Error;
        }
        await blobService.deleteBlob(containerName, media._id + '.jpg');
        await media.remove();
        res.send();
    } catch (err) {
        console.log(err);
        res.status(404).send(err);
    }
});

export default router;
