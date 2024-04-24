import express from 'express';
import upload from '../Middleware/UploadImage.js';
import { urlImages } from '../Controller/UserScreenShot.js';

const router= express.Router();

router.post('/uploadScreenshot', upload.single('image'), urlImages);

export default router;