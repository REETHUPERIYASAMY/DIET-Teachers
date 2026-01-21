const dotenv = require('dotenv');

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const PORT = process.env.PORT || 5000;
const DATABASE_URL = process.env.DATABASE_URL;
const NODE_ENV = process.env.NODE_ENV;
const AI_MODEL_ENDPOINT = process.env.AI_MODEL_ENDPOINT;
const EMAIL_SERVICE_API_KEY = process.env.EMAIL_SERVICE_API_KEY;
const EMAIL_SERVICE_DOMAIN = process.env.EMAIL_SERVICE_DOMAIN;

module.exports = { JWT_SECRET, PORT, DATABASE_URL, NODE_ENV, AI_MODEL_ENDPOINT, EMAIL_SERVICE_API_KEY, EMAIL_SERVICE_DOMAIN };