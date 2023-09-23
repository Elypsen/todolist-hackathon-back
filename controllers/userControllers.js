const User = require("../models/user");
const argon2 = require("argon2");
const { generateAccessToken } = require("../authJWT");



async function createUser(req, res) {
    // #swagger.tags = ['users']
      // #swagger.description = 'Endpoint to create a new user.'
      // #swagger.summary = 'Create a new user'
      // #swagger.parameters['user'] = { description: 'User object', required: true, type: 'object'}
    const user = new User(req.body);
    console.log(user)
    await user.validate();
    try {
        const hash = await argon2.hash(user.password);
        console.log(hash)
        user.password = hash;
        await User.create(user);
        res.status(201).json(user);
    } catch (err) {
        res.status(404).json({ message: "createUser : " + err.message });
    }
}

async function connectUser(req, res) {
    // #swagger.tags = ['Security']
    // #swagger.summary = 'Get authentication token'
    // #swagger.description = 'Endpoint to authenticate a user and return a JWT token'
    
    let user;
    let username = req.body.username;
    try {
        user = await User.findOne({ username: username });
        try {
            if (await argon2.verify(user.password, req.body.password)) {
                const token = generateAccessToken(user.username);
                res.status(200).json(token);
            } else {
                res.status(400).json({ message: "Mauvais mot de passe ! " });
            }
        } catch (err) {
            res.status(400).json({ message: "connectUser : " + err.message });
        }
    } catch (err) {
        res.status(404).json({ message: "connexion : " + err.message });
    }
}
module.exports = {
    createUser,
    connectUser
}