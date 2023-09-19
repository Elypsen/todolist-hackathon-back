const mongoose = require("mongoose");
const { Schema } = mongoose;
const taskSchema = Schema({
    title: {
        type: String,
        unique: true
    },
    content: {
        type: String,
        unique: true
    },

    isDone: {
        type: Boolean,
        unique: true
    },
    userTask: {
        type: String,
        unique: true
    },

})

const Task = mongoose.model('Task', tasksSchema);

module.exports = Task;