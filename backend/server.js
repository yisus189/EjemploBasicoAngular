const express = require('express');
    const mongoose = require('mongoose');
    const cors = require('cors');

    const app = express();
    app.use(cors());
    app.use(express.json());

    mongoose.connect('mongodb://127.0.0.1:27017/taskdb', {
      }).then(() => {
      console.log('Connected to MongoDB');
    }).catch(err => console.error('Error connecting to MongoDB:', err));

    const taskSchema = new mongoose.Schema({
      title: { type: String, required: true },
      description: { type: String },
      completed: { type: Boolean, default: false },
    });

    const Task = mongoose.model('Task', taskSchema);

    // Obtener todas las tareas
    app.get('/tasks', async (req, res) => {
      const tasks = await Task.find();
      res.json(tasks);
    });

    // Crear una nueva tarea
    app.post('/tasks', async (req, res) => {
      const newTask = new Task(req.body);
      console.log(req.body);
      await newTask.save();
      res.status(201).json(newTask);
    });

// Actualizar una tarea
    app.put('/tasks/:id', async (req, res) => {
      const taskId = req.params.id;
      const updatedData = req.body;
      try {
        const updatedTask = await Task.findByIdAndUpdate(taskId, updatedData, { new: true });
        if (!updatedTask) {
          return res.status(404).send({ error: 'Tarea no encontrada' });
        }
        res.json(updatedTask);
      } catch (error) {
        res.status(500).send({ error: 'Error al actualizar la tarea' });
      }
    });

    // Eliminar una tarea
    app.delete('/tasks/:id', async (req, res) => {
      const taskId = req.params.id;
      try {
        const deletedTask = await Task.findByIdAndDelete(taskId);
        if (!deletedTask) {
          return res.status(404).send({ error: 'Tarea no encontrada' });
        }
        res.status(200).send({ message: 'Tarea eliminada correctamente' });
      } catch (error) {
        res.status(500).send({ error: 'Error al eliminar la tarea' });
      }
    });

    app.listen(4000, () => {
      console.log('Server running on http://localhost:3000');
    });
