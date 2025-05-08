const multer = require('multer');
const path = require('path');
const fs = require('fs');

const allowedFolders = ['structures', 'blogs']; // Add more folders here as needed

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const folder = req.body.folder;

        if (!allowedFolders.includes(folder)) {
            return cb(new Error('Invalid upload folder'));
        }

        const uploadPath = path.join(__dirname, `../../public/images/structures`);
        console.log('upload path: ', uploadPath)
        // Ensure directory exists
        fs.mkdirSync(uploadPath, { recursive: true });

        cb(null, uploadPath);
    },

    filename: function (req, file, cb) {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    }
});

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  }
});

module.exports = upload;