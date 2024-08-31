const express = require('express');
const multer = require('multer');
const admin = require('firebase-admin');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config(); // Load environment variables

// Initialize Firebase Admin SDK using environment variables
admin.initializeApp({
    credential: admin.credential.cert({
        type: process.env.FIREBASE_TYPE,
        project_id: process.env.FIREBASE_PROJECT_ID,
        private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
        private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        client_id: process.env.FIREBASE_CLIENT_ID,
        auth_uri: process.env.FIREBASE_AUTH_URI,
        token_uri: process.env.FIREBASE_TOKEN_URI,
        auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
        universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN
    }),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

const bucket = admin.storage().bucket();
const db = admin.database();

const app = express();
const port = process.env.PORT || 3000;

const upload = multer({ storage: multer.memoryStorage() });

app.use(express.static('public'));

app.post('/api/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  console.log('Received file:', req.file.originalname);

  try {
    const file = bucket.file(req.file.originalname);
    const blobStream = file.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    blobStream.on('error', (error) => {
      console.error('Error uploading to Firebase Storage:', error);
      res.status(500).send('Error uploading file.');
    });

    blobStream.on('finish', async () => {
      const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(req.file.originalname)}?alt=media`;

      const code = uuidv4().slice(0, 4);
      console.log('Generated code:', code);

      try {
        await db.ref(`imageCodes/${code}`).set({ url: publicUrl });
        console.log('Code and URL stored in Firebase Realtime Database.');
        
        res.json({ link: publicUrl, code: code });
      } catch (error) {
        console.error('Error storing data in Firebase Realtime Database:', error);
        res.status(500).send('Error storing data.');
      }
    });

    blobStream.end(req.file.buffer);
  } catch (error) {
    console.error('Error processing upload:', error);
    res.status(500).send('Error processing upload.');
  }
});

app.get('/api/image/:code', async (req, res) => {
  const code = req.params.code;
  try {
    const snapshot = await db.ref(`imageCodes/${code}`).once('value');
    const data = snapshot.val();
    if (data && data.url) {
      res.json({ url: data.url });
    } else {
      res.status(404).json({ message: 'Image not found.' });
    }
  } catch (error) {
    console.error('Error retrieving image from Firebase Realtime Database:', error);
    res.status(500).json({ message: 'Error retrieving image.' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
