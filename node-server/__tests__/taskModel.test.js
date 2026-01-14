/**
 * Task Model Unit Tests
 */

const TaskModel = require('../src/models/taskModel');

describe('TaskModel', () => {
  
  describe('getAllTasks', () => {
    it('should return an array of tasks', () => {
      const tasks = TaskModel.getAllTasks();
      expect(Array.isArray(tasks)).toBe(true);
      expect(tasks.length).toBeGreaterThan(0);
    });

    it('should return initial tasks', () => {
      const tasks = TaskModel.getAllTasks();
      expect(tasks).toContain("Write a diary entry from the future");
      expect(tasks).toContain("Create a time machine from a cardboard box");
    });
  });

  describe('addTask', () => {
    it('should add a task and return success', () => {
      const result = TaskModel.addTask('Unit test task');
      expect(result).toHaveProperty('message', 'Task added successfully');
    });

    it('should throw error for empty task', () => {
      expect(() => {
        TaskModel.addTask('');
      }).toThrow('Task text must be a non-empty string');
    });

    it('should throw error for non-string task', () => {
      expect(() => {
        TaskModel.addTask(123);
      }).toThrow('Task text must be a non-empty string');
    });

    it('should throw error for null task', () => {
      expect(() => {
        TaskModel.addTask(null);
      }).toThrow('Task text must be a non-empty string');
    });
  });

  describe('getTaskCount', () => {
    it('should return the correct count of tasks', () => {
      const initialCount = TaskModel.getTaskCount();
      TaskModel.addTask('Count test task');
      const newCount = TaskModel.getTaskCount();
      expect(newCount).toBe(initialCount + 1);
    });
  });
});
