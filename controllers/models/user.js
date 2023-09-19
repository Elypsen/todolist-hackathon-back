const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },

    password: String,
    userTask: {
        type: String,
        unique: true
    },

})

const Task = mongoose.model('Task', tasksSchema);

module.exports = Task;