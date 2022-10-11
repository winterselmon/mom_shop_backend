// const express = require('express');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const mongo_uri = require('../config/keys').mongoURI;
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

mongoose.connect(mongo_uri, { useNewUrlParser: true, useUnifiedTopology: false }).then(
    () => {
        console.log("[success] : connected to the database");
    },
    error => {
        console.log("[failed] " + error);
        process.exit();
    }
);

app.use('/healthcheck', require('../routes/health_check'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const income = require('../routes/income');
app.use('/', income);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Application is running on port ${port}`);
});