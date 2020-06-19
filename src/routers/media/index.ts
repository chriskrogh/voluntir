import express, { Request, Response } from 'express';
import { RouteError } from '../../utils/exception';
import { PassThrough } from 'stream';
import { imageSize } from 'image-size';
import { AuthenticatedRequest } from '../../types/network';
import MediaModel from '../../models/media';
import upload from '../../utils/upload';
import auth from '../../middleware/auth';
import compress from '../../utils/compress';
import blobService from '../../utils/blobstorage';
import { Routes, CONTAINER_NAME } from '../../utils/constants';
import * as M from '../../utils/errorMessages';

const router = express.Router();

// set media
router.post(
  Routes.MEDIA,
  auth,
  upload.single('media'),
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      await blobService.createContainerIfDoesNotExist(CONTAINER_NAME);
      if (!req.file || !req.file.buffer) throw new Error('File not present');

      const newBuffer = await compress(req.file.buffer);

      const { width, height } = imageSize(newBuffer);
      if(!width || !height) throw new Error(M.AR);
      const AR = width / height;

      const media = new MediaModel({ AR, ...req.body });

      await blobService.uploadString(CONTAINER_NAME, media._id + '.jpg', newBuffer);
      await media.save();
      res.status(201).send(media);
    } catch (exc) {
      console.log(exc);
      res.status(exc.status || 400).send(exc?.error?.message);
    }
  }
);

// get media by id
router.get(Routes.MEDIA, async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    const media = await MediaModel.findById(id);
    if(!media) {
      throw new RouteError(new Error(M.FIND_MEDIA), 404);
    }
    res.send(media);
  } catch (exc) {
    console.log(exc);
    res.status(exc.status || 400).send(exc?.error?.message);
  }
});

// get image by id
router.get(Routes.MEDIA + '/image', async (req: Request, res: Response) => {
  try {
    const { id } = req.query;

    const stream = new PassThrough();
    const data: Uint8Array[] = [];

    stream.on('data', d => data.push(d));
    await blobService.downloadBlob(CONTAINER_NAME, id + '.jpg', stream);
    const mergedBuffer = Buffer.concat(data);

    res.set('Content-Type', 'image/jpg');
    res.send(mergedBuffer);
  } catch (exc) {
    console.log(exc);
    res.status(exc.status || 400).send(exc?.error?.message);
  }
});

// delete media
router.delete(Routes.MEDIA, auth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const media = await MediaModel.findById(req.query.id);
    if(!media) {
      throw new RouteError(new Error(M.FIND_MEDIA), 404);
    }
    const fileName = req.query.id + '.jpg';
    await blobService.deleteBlob(CONTAINER_NAME, fileName);
    await media.remove();
    res.send();
  } catch (exc) {
    console.log(exc);
    res.status(exc.status || 400).send(exc?.error?.message);
  }
});

export default router;
