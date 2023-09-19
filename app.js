const express = require('express');
var cors = require('cors');
require("dotenv").config();
const bodyParser = require('body-parser');

 const connectDB = require("./config/bd");
 const app = express();
 connectDB()

const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger_output.json'); il faut  le décommenter une fois on a les router
const swaggerAutogen = require('swagger-autogen');
 app.use(express.json());

const outputFile = './swagger_output.json'

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
swaggerAutogen(outputFile, []) // rajouter les routers dès qu'ils existes
//app.use('/docs',swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(8000, () => {
    console.log(`Le serveur est en écoute sur le port 8000`);
});
