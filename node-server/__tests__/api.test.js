/**
 * API Integration Tests
 * Tests for task endpoints using supertest
 */

const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const taskRoutes = require('../src/routes/taskRoutes');
const { healthCheck } = require('../src/controllers/taskController');

// Create test app
const app = express();
app.use(bodyParser.json());
app.get('/', healthCheck);
app.use('/', taskRoutes);

describe('Task API Endpoints', () => {
  
  describe('GET /', () => {
    it('should return Hello World', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.text).toBe('Hello World');
    });
  });

  describe('GET /tasks', () => {
    it('should return all tasks', async () => {
      const response = await request(app).get('/tasks');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('tasks');
      expect(Array.isArray(response.body.tasks)).toBe(true);
      expect(response.body.tasks.length).toBeGreaterThan(0);
    });

    it('should return tasks as an array of strings', async () => {
      const response = await request(app).get('/tasks');
      expect(response.status).toBe(200);
      response.body.tasks.forEach(task => {
        expect(typeof task).toBe('string');
      });
    });
  });

  describe('POST /tasks', () => {
    it('should add a new task successfully', async () => {
      const newTask = { text: 'Test task from Jest' };
      const response = await request(app)
        .post('/tasks')
        .send(newTask)
        .set('Content-Type', 'application/json');
      
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('message', 'Task added successfully');
    });

    it('should verify the task was added', async () => {
      const newTask = { text: 'Another test task' };
      
      // Get initial count
      const initialResponse = await request(app).get('/tasks');
      const initialCount = initialResponse.body.tasks.length;
      
      // Add task
      await request(app)
        .post('/tasks')
        .send(newTask)
        .set('Content-Type', 'application/json');
      
      // Verify count increased
      const finalResponse = await request(app).get('/tasks');
      const finalCount = finalResponse.body.tasks.length;
      expect(finalCount).toBe(initialCount + 1);
      expect(finalResponse.body.tasks).toContain(newTask.text);
    });

    it('should return 400 if task text is missing', async () => {
      const response = await request(app)
        .post('/tasks')
        .send({})
        .set('Content-Type', 'application/json');
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('should return 400 if request body is empty', async () => {
      const response = await request(app)
        .post('/tasks')
        .send({ text: '' })
        .set('Content-Type', 'application/json');
      
      expect(response.status).toBe(400);
    });
  });

  describe('404 Handler', () => {
    it('should return 404 for undefined routes', async () => {
      const response = await request(app).get('/nonexistent');
      expect(response.status).toBe(404);
    });
  });
});
