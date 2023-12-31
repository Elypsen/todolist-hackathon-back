const express = require('express');
const connectDB = require("./config/bd");
// const session = require('express-session');
require("dotenv").config();
var cors = require('cors');
const bodyParser = require('body-parser');
// connexion à la DB
connectDB();
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
const swaggerUi = require('swagger-ui-express');
const swaggerAutogen = require('swagger-autogen');

const outputFile = './swagger_output.json'
 swaggerAutogen(outputFile, ['./routes/userRoutes','./routes/taskRoutes'])//
const swaggerDocument = require('./swagger_output.json');
app.use('/docs',swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const userRouter= require('./routes/userRoutes')
const routerTask=require("./routes/taskRoutes")
app.use(cors());

app.use("/task", routerTask);
app.use("/", userRouter)

app.listen(8000, () => {
    console.log(`Le serveur est en écoute sur le port 8000`);
});

