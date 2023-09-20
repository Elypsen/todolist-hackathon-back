const express = require("express");
const router = express.Router();
const { createTask,  updateTask, deleteTask, getTasksComplted, getTasks } = require("../controllers/taskControllers");


router.post("/addTask", createTask)
router.post("/displayList/:id_User", getTasks);
router.post("/displayListCompleted/:id_User", getTasksComplted);
router.put("/updateCompleted/:_id", updateTask);
router.delete("/deleteTask/:_id", deleteTask)

module.exports = router;