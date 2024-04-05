// userRoutes.test.js

const request = require('supertest');
const app = require('../app'); // Assuming your Express app is defined in 'app.js'
const { User, Thought } = require('../models');

describe('API Routes', () => {
  beforeEach(async () => {
    // Clear the database or perform any necessary setup before each test
    await User.deleteMany();
    await Thought.deleteMany();
  });

  describe('User Routes', () => {
    test('GET /api/users should return all users', async () => {
      await User.create({ username: 'user1', email: 'user1@example.com' });
      await User.create({ username: 'user2', email: 'user2@example.com' });

      const response = await request(app).get('/api/users');

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(2);
      expect(response.body[0].username).toBe('user1');
      expect(response.body[1].username).toBe('user2');
    });

    test('POST /api/users should create a new user', async () => {
      const newUser = { username: 'newuser', email: 'newuser@example.com' };
      const response = await request(app).post('/api/users').send(newUser);

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(newUser);
    });

    // Add more tests for other user routes as needed
  });

  describe('Thought Routes', () => {
    test('GET /api/thoughts should return all thoughts', async () => {
      await Thought.create({ thoughtText: 'Thought 1', username: 'user1' });
      await Thought.create({ thoughtText: 'Thought 2', username: 'user2' });

      const response = await request(app).get('/api/thoughts');

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(2);
      expect(response.body[0].thoughtText).toBe('Thought 1');
      expect(response.body[1].thoughtText).toBe('Thought 2');
    });

    test('POST /api/thoughts should create a new thought', async () => {
      const newThought = { thoughtText: 'New thought', username: 'user1' };
      const response = await request(app).post('/api/thoughts').send(newThought);

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(newThought);
    });

    // Add more tests for other thought routes as needed
  });

  describe('Friend Routes', () => {
    test('POST /api/users/:userId/friends/:friendId should add a new friend', async () => {
      const user1 = await User.create({ username: 'user1', email: 'user1@example.com' });
      const user2 = await User.create({ username: 'user2', email: 'user2@example.com' });

      const response = await request(app)
        .post(`/api/users/${user1._id}/friends/${user2._id}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Friend added successfully');
    });

    test('DELETE /api/users/:userId/friends/:friendId should remove a friend', async () => {
      const user1 = await User.create({ username: 'user1', email: 'user1@example.com' });
      const user2 = await User.create({ username: 'user2', email: 'user2@example.com' });

      await user1.friends.push(user2._id);
      await user1.save();

      const response = await request(app)
        .delete(`/api/users/${user1._id}/friends/${user2._id}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Friend removed successfully');
    });

    // Add more tests for other friend routes as needed
  });

});