export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

export const validatePassword = (password) => {
    return password.length >= 6; // Minimum length of 6 characters
};

export const validateTrainingData = (data) => {
    const { title, description, topics } = data;
    return title && description && Array.isArray(topics) && topics.length > 0;
};