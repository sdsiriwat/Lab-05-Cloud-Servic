import express from 'express';
import multer from 'multer';
import { Request, Response } from 'express';
import dotenv from 'dotenv'
dotenv.config();
import { uploadFile, getPresignedUrl } from '../services/UploadFileService';




const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();


router.post('/uploads', upload.single('file'), async (req: Request, res: Response) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).send('No file uploaded.');
    }

    const bucket = process.env.SUPABASE_BUCKET_NAME;
    const filePath = process.env.UPLOAD_DIR;
    if (!bucket || !filePath) {
      return res.status(500).send('Bucket name or file path not configured.');
    }
    const fileKey = await uploadFile(bucket, filePath, file);

    res.status(200).json({ status: 'success',
        message: `File uploaded successfully`,
        fileKey: fileKey
     });
  } catch (error) {
    res.status(500).send('Error uploading file.');
  }
});

router.get('/presignedUrl', async (req: Request, res: Response) => {
    try {
        const { key } = req.query;        
        if (!key || typeof key !== 'string') {
            return res.status(400).send('File key is required.');
        }        
        const bucket = process.env.SUPABASE_BUCKET_NAME;
        const filePath = process.env.UPLOAD_DIR;
        if (!bucket || !filePath) {
            return res.status(500).send('Bucket name or file path not configured.');
        }
        const presignedUrl = await getPresignedUrl(bucket, key, 3600);
        res.status(200).json({ url: presignedUrl });
   } catch (error) {
        console.error('Error generating presigned URL:', error);
        res.status(500).send('Error generating presigned URL.');
    }
});

  export default router;
