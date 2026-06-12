const { validationResult } = require('express-validator');
const Task = require('../models/Task');

// @route   POST /api/v1/tasks
// @desc    Create a new task
// @access  Private
const createTask = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description, status } = req.body;

  try {
    const task = await Task.create({
      title,
      description,
      status: status || 'Pending',
      user: req.user._id, // task belongs to logged in user
    });

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      task,
    });
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/v1/tasks
// @desc    Get all tasks (admin gets all, user gets only theirs)
// @access  Private
const getAllTasks = async (req, res, next) => {
  try {
    let tasks;

    if (req.user.role === 'admin') {
      // Admin can see all tasks with user info
      tasks = await Task.find().populate('user', 'name email');
    } else {
      // Regular user sees only their tasks
      tasks = await Task.find({ user: req.user._id });
    }

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/v1/tasks/:id
// @desc    Get a single task by ID
// @access  Private
const getSingleTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id).populate('user', 'name email');

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Regular users can only access their own tasks
    if (req.user.role !== 'admin' && task.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not allowed to access this task' });
    }

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    next(error);
  }
};

// @route   PUT /api/v1/tasks/:id
// @desc    Update a task
// @access  Private
const updateTask = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Regular users can only update their own tasks
    if (req.user.role !== 'admin' && task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not allowed to update this task' });
    }

    const { title, description, status } = req.body;

    task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, status },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      task,
    });
  } catch (error) {
    next(error);
  }
};

// @route   DELETE /api/v1/tasks/:id
// @desc    Delete a task
// @access  Private
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Regular users can only delete their own tasks
    if (req.user.role !== 'admin' && task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not allowed to delete this task' });
    }

    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createTask, getAllTasks, getSingleTask, updateTask, deleteTask };
