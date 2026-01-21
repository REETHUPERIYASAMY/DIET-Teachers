const express = require('express');
const { register, login, me } = require('../controllers/auth.controller');
const { validateRegistration, validateLogin } = require('../utils/validators');

const router = express.Router();

router.post('/register', validateRegistration, register);
router.post('/login', validateLogin, login);
router.get('/me', require('../middleware/auth.middleware').authMiddleware, me);

module.exports = router;