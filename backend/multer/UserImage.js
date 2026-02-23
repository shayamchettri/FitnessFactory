import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'assets/UserImages');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
        cb(null, true);
    } else {
        cb(new Error('Please upload files with proper format (jpeg, jpg, png, gif)'));
    }
};

export const uploadUserImage = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
}).single('image');

export const uploadGuideImage = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.error('File upload error:', err);
            return res.status(400).json({ error: err.message });
        }
        res.status(200).json({ message: 'File uploaded successfully' });
    });
};
