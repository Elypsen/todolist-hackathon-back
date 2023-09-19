const Task = require("../models/task")

async function createTask(req, res) {
    const task = new Task(req.body);
    console.log(task)
    await task.validate();
    try {
        await Task.create(task);
        res.status(201).json(task);
    } catch (err) {
        res.status(404).json({ message: "createtask : " + err.message });
    }
}
async function getTasks(req, res) {
    try {
        const tasks= await Task.find({  username: req.params.userName })
      //const tasks = await Task.find();
      res.status(200).json(tasks);
    } catch (err) {
      res.status(404).json({ message: "getTasks : " + err.message });
    }
  }
async function getTasksComplted(req, res) {
    try {
        const tasks= await Task.find({  username: req.params.userName , completed:true})
      //const tasks = await Task.find();
      res.status(200).json(tasks);
    } catch (err) {
      res.status(404).json({ message: "getTasks : " + err.message });
    }
  }

  async function deleteTask(req, res) {
    const {_id } = req.params;
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
    try {
        console.log(req.params)
        console.log(req.body)
        const { _id } = req.params;
        const { newCompletedValue } = req.body;
        // Utilisez la méthode updateOne() de Mongoose pour mettre à jour un seul document
        const task = await Task.updateOne({ _id: _id },{ completed: newCompletedValue })
        const tasks = await Task.find();
        res.status(200).json(tasks);
      //const task = await Task.findByIdAndUpdate(req.params.id, req.body);
     // res.status(201).json(task);
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





