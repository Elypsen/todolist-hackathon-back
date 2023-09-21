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
    task: {
        type: [String]
        
    },

})

const User = mongoose.model('user', userSchema);

module.exports = User;