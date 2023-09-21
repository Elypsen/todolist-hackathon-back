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
       
    },
    id_User: {
        type: String,
        
    },

})

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;