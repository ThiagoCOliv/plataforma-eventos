const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');
const express = require('express');
const cors = require('cors')
const app = express();
const routes = require('./routes/routes')
require('dotenv').config();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(port, () => {
    console.log(`Servidor está rodando em http://localhost:${port}/docs`);
});