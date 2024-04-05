const https = require('https');
const fs = require('fs');
const express = require('express');
const app = express();

const options = {
  key: fs.readFileSync('path_to_private_key.pem'),
  cert: fs.readFileSync('path_to_certificate.pem')
};

const server = https.createServer(options, app);

server.listen(443, () => {
  console.log('Server is running on port 443');
});
//You'll need to obtain an SSL certificate and configure your server to use HTTPS.