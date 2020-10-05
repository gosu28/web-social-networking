const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const expressStatusMonitor = require('express-status-monitor');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const errorHandler = require('./middlewares/errorHandler');
const camelcaseRequest = require('./middlewares/camelCaseRequest');
const snakecaseResponse = require('./middlewares/snakeCaseResponse');

require('dotenv').config();
require('./models');

const app = express();

app.use(cors());
app.use(expressStatusMonitor());
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(camelcaseRequest);
app.use(snakecaseResponse());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  expressValidator({
    customValidators: {
      isArray(value) {
        return Array.isArray(value);
      },
      notEmpty(array) {
        return array.length > 0;
      },
    },
  }),
);

require('./routes')(app);

app.use(errorHandler);

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
