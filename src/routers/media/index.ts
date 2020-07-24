import express, { Request, Response } from 'express';
import { RouteError } from '../../utils/exception';
import { imageSize } from 'image-size';
import { AuthenticatedRequest } from '../../types/network';
import MediaModel from '../../models/media';
import upload from '../../utils/upload';
import auth from '../../middleware/auth';
import compress from '../../utils/compress';
import blobService from '../../utils/blobstorage';
import * as M from '../../utils/errorMessages';

const router = express.Router();

// set media
router.post(
  '/',
  auth,
  upload.single('media'),
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      await blobService.createContainerIfDoesNotExist('media');
      if (!req.file || !req.file.buffer) throw new Error('File not present');

      const newBuffer = await compress(req.file.buffer);

      const { width, height } = imageSize(newBuffer);
      if(!width || !height) throw new Error('Could not compute aspect ratio for image');
      const AR = width / height;

      const media = new MediaModel({ AR, ...req.body });

      await blobService.uploadContent('media', media._id + '.jpg', newBuffer);
      await media.save();
      res.status(201).send(media);
    } catch (exc) {
      console.log(exc);
      res.status(exc.status || 400).send(exc?.error?.message);
    }
  }
);

// get media by id
router.get('/', async (req: Request, res: Response) => {
  try {
    const media = await MediaModel.findById(req.query.id);
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
router.get('/image', async (req: Request, res: Response) => {
  try {
    const { container, id } = req.query;

    const blob = await blobService.downloadContent(container as string, id + '.jpg');

    res.set('Content-Type', 'image/jpg');
    res.send(blob);
  } catch (exc) {
    console.log(exc);
    res.status(exc.status || 400).send(exc?.error?.message);
  }
});

// delete media
router.delete('/', auth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { container, id } = req.query;
    const fileName = id + '.jpg';

    const media = await MediaModel.findById(id);
    if(!media) {
      throw new RouteError(new Error(M.FIND_MEDIA), 404);
    }

    await blobService.deleteBlob(container as string, fileName);
    await media.remove();

    res.send();
  } catch (exc) {
    console.log(exc);
    res.status(exc.status || 400).send(exc?.error?.message);
  }
});

export default router;
