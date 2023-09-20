const express = require("express");
// const { Logout } = require("../controllers/logout.routes");
const router = express.Router();

const { createUser, connectUser } = require("../controllers/userControllers");
const { authenticateToken } = require("../authJWT");
router.post("/signUp", createUser)
router.post("/login", connectUser);


// router.post("/logout", Logout)
router.use(authenticateToken);

module.exports = router;