const request = require('supertest');
const app = require('../src/index'); // Adjust the path if necessary
const Training = require('../src/models/Training.model');

describe('Training Routes', () => {
    beforeAll(async () => {
        await Training.deleteMany({});
    });

    afterAll(async () => {
        await Training.deleteMany({});
    });

    it('should create a new training', async () => {
        const trainingData = {
            topic: 'Introduction to MERN Stack',
            modules: ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
        };

        const response = await request(app)
            .post('/api/trainings')
            .send(trainingData)
            .expect(201);

        expect(response.body).toHaveProperty('_id');
        expect(response.body.topic).toBe(trainingData.topic);
    });

    it('should retrieve all trainings', async () => {
        const response = await request(app)
            .get('/api/trainings')
            .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('should retrieve a training by ID', async () => {
        const training = await Training.create({
            topic: 'Advanced React',
            modules: ['Hooks', 'Context API', 'Redux'],
        });

        const response = await request(app)
            .get(`/api/trainings/${training._id}`)
            .expect(200);

        expect(response.body).toHaveProperty('_id', training._id.toString());
        expect(response.body.topic).toBe(training.topic);
    });

    it('should update a training', async () => {
        const training = await Training.create({
            topic: 'Node.js Basics',
            modules: ['Express.js', 'Middleware'],
        });

        const updatedData = {
            topic: 'Node.js Advanced',
            modules: ['Express.js', 'Middleware', 'Error Handling'],
        };

        const response = await request(app)
            .put(`/api/trainings/${training._id}`)
            .send(updatedData)
            .expect(200);

        expect(response.body.topic).toBe(updatedData.topic);
    });

    it('should delete a training', async () => {
        const training = await Training.create({
            topic: 'Testing in MERN',
            modules: ['Jest', 'Supertest'],
        });

        await request(app)
            .delete(`/api/trainings/${training._id}`)
            .expect(204);

        const deletedTraining = await Training.findById(training._id);
        expect(deletedTraining).toBeNull();
    });
});