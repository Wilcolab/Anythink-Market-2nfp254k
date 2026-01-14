/**
 * Task Model
 * In-memory storage for tasks (can be replaced with database connection)
 */

class TaskModel {
  constructor() {
    this.tasks = [
      "Write a diary entry from the future",
      "Create a time machine from a cardboard box",
      "Plan a trip to the dinosaurs",
      "Draw a futuristic city",
      "List items to bring on a time-travel adventure"
    ];
  }

  /**
   * Get all tasks
   * @returns {Array} Array of tasks
   */
  getAllTasks() {
    return this.tasks;
  }

  /**
   * Add a new task
   * @param {string} taskText - The task text to add
   * @returns {Object} Result object with success status
   */
  addTask(taskText) {
    if (!taskText || typeof taskText !== 'string') {
      throw new Error('Task text must be a non-empty string');
    }
    this.tasks.push(taskText);
    return { success: true, message: 'Task added successfully' };
  }

  /**
   * Get task count
   * @returns {number} Number of tasks
   */
  getTaskCount() {
    return this.tasks.length;
  }
}

// Export singleton instance
module.exports = new TaskModel();
