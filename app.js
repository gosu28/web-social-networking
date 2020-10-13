const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const app = express();
app.use(compression());
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

app.get('/', (req, res) => res.send('API running'))
module.exports = app;