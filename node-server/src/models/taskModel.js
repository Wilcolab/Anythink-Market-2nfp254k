/**
 * TaskModel - In-Memory Task Data Store
 * 
 * This class manages task data using an in-memory array.
 * It's a simple demonstration implementation suitable for development and testing.
 * 
 * Production Considerations:
 * - Replace with a persistent database (MongoDB, PostgreSQL, etc.)
 * - Add data validation middleware
 * - Implement proper error handling
 * - Add pagination support for large datasets
 * - Include transaction support if needed
 * 
 * @class TaskModel
 */

class TaskModel {
  /**
   * Initialize the task model with sample data
   * Creates a new TaskModel instance with pre-populated sample tasks
   */
  constructor() {
    /**
     * In-memory task storage
     * @type {Array<string>}
     * @private
     */
    this.tasks = [
      "Write a diary entry from the future",
      "Create a time machine from a cardboard box",
      "Plan a trip to the dinosaurs",
      "Draw a futuristic city",
      "List items to bring on a time-travel adventure"
    ];
  }

  /**
   * Get all tasks from storage
   * 
   * Returns a complete list of all tasks currently in the system.
   * 
   * @returns {Array<string>} Array of all task strings
   * @example
   * const tasks = taskModel.getAllTasks();
   * // Returns: ['Write a diary entry...', 'Create a time machine...', ...]
   */
  getAllTasks() {
    return this.tasks;
  }

  /**
   * Add a new task to storage
   * 
   * Validates the input and appends a new task to the tasks array.
   * Throws an error if the input is invalid.
   * 
   * @param {string} taskText - The text content of the task to add
   * @returns {{success: boolean, message: string}} Result object with success status and message
   * @throws {Error} If taskText is not provided or is not a string
   * @example
   * const result = taskModel.addTask('Complete documentation');
   * // Returns: {success: true, message: 'Task added successfully'}
   */
  addTask(taskText) {
    // Validate input
    if (!taskText || typeof taskText !== 'string') {
      throw new Error('Task text must be a non-empty string');
    }
    
    // Add to storage
    this.tasks.push(taskText);
    return { success: true, message: 'Task added successfully' };
  }

  /**
   * Get the total number of tasks
   * 
   * Returns the count of all tasks currently stored in the system.
   * 
   * @returns {number} Total count of tasks in storage
   * @example
   * const count = taskModel.getTaskCount();
   * // Returns: 5
   */
  getTaskCount() {
    return this.tasks.length;
  }
}

// Export singleton instance
module.exports = new TaskModel();
