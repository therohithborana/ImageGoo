# ImageGoo

ImageGoo is a web-based application that allows users to easily upload, share, and access images using unique 4-character codes. It provides a simple and efficient way to manage and distribute images online.

![image](https://github.com/user-attachments/assets/92709afc-b131-4a8e-b2ca-5a3f0fa5e64b)

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

- Image upload functionality
- Generation of shareable links for uploaded images
- Unique 4-character code assignment for each uploaded image
- QR code generation for easy sharing
- Image lookup using 4-character codes
- Responsive design for various device sizes

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/imagegoo.git
   cd imagegoo
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following variables:
   ```
   FIREBASE_TYPE=
   FIREBASE_PROJECT_ID=
   FIREBASE_PRIVATE_KEY_ID=
   FIREBASE_PRIVATE_KEY=
   FIREBASE_CLIENT_EMAIL=
   FIREBASE_CLIENT_ID=
   FIREBASE_AUTH_URI=
   FIREBASE_TOKEN_URI=
   FIREBASE_AUTH_PROVIDER_X509_CERT_URL=
   FIREBASE_CLIENT_X509_CERT_URL=
   FIREBASE_DATABASE_URL=
   FIREBASE_STORAGE_BUCKET=
   FIREBASE_API_KEY=
   FIREBASE_AUTH_DOMAIN=
   FIREBASE_MESSAGING_SENDER_ID=
   FIREBASE_APP_ID=
   PORT=3000
   ```
   Replace the empty values with your Firebase project details.

4. Start the server:
   ```
   npm start
   ```

## Usage

1. Open a web browser and navigate to `http://localhost:3000` (or your deployed URL).
2. To upload an image:
   - Click on "Select an image to upload" and choose an image file.
   - Click the "Upload" button.
   - Once uploaded, you'll receive a shareable link and a 4-character code.
3. To access an image using a code:
   - Enter the 4-character code in the "Access Image by Code" section.
   - Click "Lookup Image" to view the image.

## Technologies Used

- Frontend: HTML, CSS, JavaScript, jQuery
- Backend: Node.js, Express.js
- Database and Storage: Firebase (Realtime Database and Storage)
- Additional libraries: Multer, UUID

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
