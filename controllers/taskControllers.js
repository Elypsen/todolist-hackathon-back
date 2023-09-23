const Task = require("../models/task")

async function createTask(req, res) {
      // #swagger.tags = ['tasks']
      // #swagger.description = 'Endpoint to create a new task.'
      // #swagger.summary = 'Create a new task'
      // #swagger.responses[200] = { description: 'Create a new task with title- content- isDone end username'}
  const task = new Task(req.body);
  console.log(task)
  await task.validate();
  try {
    await Task.create(task);
    res.status(200).json(task);
  } catch (err) {
    res.status(404).json({ message: "createtask : " + err.message });
  }
}
async function getTasks(req, res) {
  // #swagger.tags = ['tasks']
  // #swagger.description = 'Endpoint to get all tasks.'
  // #swagger.summary = 'Get all tasks'
  // #swagger.responses[200] = { description: 'Tasks found.' }
  console.log(req.params.id_User)
  try {
    const tasks = await Task.find({ id_User: req.params.id_User })
    //const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(404).json({ message: "getTasks : " + err.message });
  }
}
async function getTasksComplted(req, res) {
  // #swagger.tags = ['tasks']
  // #swagger.description = 'Endpoint to get all tasks completed.'
  // #swagger.summary = 'Get all tasks completed'
  // #swagger.responses[200] = { description: 'Tasks completed found.' }
  try {
    const tasks = await Task.find({ username: req.params.id_User, is_Done: true })
    res.status(200).json(tasks);
  } catch (err) {
    res.status(404).json({ message: "getTasks : " + err.message });
  }
}

async function deleteTask(req, res) {
  // #swagger.tags = ['tasks']
  // #swagger.description = 'Endpoint to delete task.'
  // #swagger.summary = 'delete task'
  // #swagger.responses[200] = { description: 'delete task' }
  const { _id } = req.params;
  try {
    // Utilisez la méthode findByIdAndRemove() pour supprimer une tâche par son ID
    const deletedTask = await Task.findByIdAndRemove(_id);
    if (!deletedTask) {
      return res.status(404).send('Tâche introuvable');
    }
    res.status(200).send('Suppression réussie');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la suppression de la tâche');
  }

}
async function updateTask(req, res) {
   // #swagger.tags = ['tasks']
  // #swagger.description = 'Endpoint to update task.'
  // #swagger.summary = 'update task'
  // #swagger.responses[200] = { description: 'Task tasked' }

  try {
    console.log(req.params)
    console.log(req.body)
    const { _id } = req.params;
    const { newCompletedValue } = req.body;
    // Utilisez la méthode updateOne() de Mongoose pour mettre à jour un seul document
    // const task = await Task.updateOne({ _id:_id },{ isDone: newCompletedValue })
    const tasks = await Task.find();
    res.status(200).json(tasks);
    const task = await Task.findByIdAndUpdate(req.params._id, req.body);
    //  res.status(201).json(task);
  } catch (err) {
    res.status(404).json({ message: "updateTask : " + err.message });
  }
}
module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getTasksComplted
}





