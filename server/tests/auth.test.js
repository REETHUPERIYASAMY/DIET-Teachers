const request = require('supertest');
const app = require('../src/index'); // Adjust the path as necessary
const User = require('../src/models/User.model');
const jwtService = require('../src/services/jwt.service');

describe('Authentication Tests', () => {
    beforeAll(async () => {
        await User.deleteMany({});
    });

    it('should register a new user', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({
                email: 'testuser@example.com',
                password: 'Password123',
                role: 'trainer'
            });
        
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('token');
    });

    it('should login an existing user', async () => {
        await request(app)
            .post('/api/auth/register')
            .send({
                email: 'testuser@example.com',
                password: 'Password123',
                role: 'trainer'
            });

        const response = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'testuser@example.com',
                password: 'Password123'
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    });

    it('should not login with incorrect password', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'testuser@example.com',
                password: 'WrongPassword'
            });

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message', 'Invalid credentials');
    });

    it('should access protected route with valid token', async () => {
        const user = await User.findOne({ email: 'testuser@example.com' });
        const token = jwtService.generateToken(user._id, user.role);

        const response = await request(app)
            .get('/api/protected-route') // Adjust the route as necessary
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
    });

    it('should not access protected route without token', async () => {
        const response = await request(app)
            .get('/api/protected-route'); // Adjust the route as necessary

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message', 'No token provided');
    });

    afterAll(async () => {
        await User.deleteMany({});
    });
});