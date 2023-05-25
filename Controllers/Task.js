const express = require('express')
const Task = require('../models/TaskScheme')

const crearTask = async (req, res = express.request) => {
    const task = new Task(req.body)

    try {
        task.user = req.uid;
        const saved = await task.save()
        res.json({
            ok: true,
            task: saved
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            task: 'Internal Error'
        })
    }
}

const listarTasks = async (req, res = express.request) => {
    const tasks = await Task.find().populate('user', 'name')

    try {
        res.status(200).json({
            ok: true,
            task: saved
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            task: 'Internal Error'
        })
    }
}

const actualizarTask = async (req, res = express.request) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({
        ok: false,
        error: 'Task not found'
      });
    }

    if (updatedTask.user.toString() !== req.uid) {
      return res.status(403).json({
        ok: false,
        error: 'Unauthorized access'
      });
    }

    res.json({
      ok: true,
      task: updatedTask
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      error: 'Internal Error'
    });
  }
};

const eliminarTask = async (req, res = express.request) => {
  const { id } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({
        ok: false,
        error: 'Task not found'
      });
    }

    if (deletedTask.user.toString() !== req.uid) {
      return res.status(403).json({
        ok: false,
        error: 'Unauthorized access'
      });
    }

    res.json({
      ok: true,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      error: 'Internal Error'
    });
  }
};

module.exports = { crearTask, listarTasks, actualizarTask, eliminarTask }