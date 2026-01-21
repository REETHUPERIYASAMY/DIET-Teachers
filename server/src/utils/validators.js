const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

const validatePassword = (password) => {
    return password.length >= 6; // Minimum length of 6 characters
};

const validateTrainingData = (data) => {
    const { title, description, topics } = data;
    return title && description && Array.isArray(topics) && topics.length > 0;
};

const validateRegistration = (req, res, next) => {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
        return res.status(400).json({ message: 'Email, password, and role are required' });
    }
    if (!validateEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }
    if (!validatePassword(password)) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }
    if (!['admin', 'trainer', 'trainee'].includes(role)) {
        return res.status(400).json({ message: 'Invalid role' });
    }
    next();
};

const validateLogin = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    next();
};

module.exports = { validateEmail, validatePassword, validateTrainingData, validateRegistration, validateLogin };