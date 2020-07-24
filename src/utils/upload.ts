import multer from 'multer';

export default multer({
  limits: {
    fileSize: 5000000
  },
  fileFilter(req, file, cb) {
    const fn = file.originalname.toLowerCase();
    if (!(fn.endsWith('jpg') || fn.endsWith('jpeg') || fn.endsWith('png')))
      return cb(new Error('File must be an image'));

    cb(null, true);
  }
});

