require('dotenv/config');
const express = require('express');
const connectdb = require('../config/dbconnection');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerJsDoc = YAML.load('./swagger.api.yaml');
const regionRoutes = require('./routes/region');
const schoolRoutes = require('./routes/school');
const userRoutes = require('./routes/user');
const template = require('./template');
const app = express();

// cors
app.use(cors());
app.options('*', cors());

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// connect db
connectdb(process.env.MONGOURL);

app.use('/swagger-api', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc));

// default route
app.get('/', (req, res) => {
  return res.send(template);
});

// api route
app.use('/api/v1/regions', regionRoutes);
app.use('/api/v1/schools', schoolRoutes);
app.use('/api/v1/users', userRoutes);

// server
app.listen(process.env.PORT, () => {
  console.log(`Server running at port ${process.env.PORT}`);
});
