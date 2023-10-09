const express = require('express');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const cors = require('cors');

const app = express();
const port = 5000;





// Configure AWS
aws.config.update({
  accessKeyId: 'AKIAWQ5MX4KIZZSCG3WU',
  secretAccessKey: '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',
  region: 'eu-north-1',
});

const s3 = new aws.S3();

// Configure multer middleware for file upload
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'aws-images-bucket',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});

// Enable CORS for all routes
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Upload image endpoint
app.post('/api/upload', upload.single('image'), (req, res) => {
  res.json({ imageUrl: req.file.location });
});

// Delete image endpoint
app.delete('/api/delete', (req, res) => {
  const imageUrl = decodeURIComponent(req.query.imageUrl);

  const params = {
    Bucket: 'aws-images-bucket',
    Key: imageUrl.split('/').pop(),
  };

  s3.deleteObject(params, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete image' });
    } else {
      res.sendStatus(200);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
