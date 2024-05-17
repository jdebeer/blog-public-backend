const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');
const routers = require('./routers');

const app = express();
const corsMiddleware = cors();

app.use(corsMiddleware);
app.use(bodyParser.json());
app.use('/api', routers);

// fail gracefully on unhandled exceptions
app.use((error, req, res, next) => {
  res.status(500);
});

// report an unexpected crash
process.on('uncaughtException', (exception) => {
  console.log('Uncaught exception:');
  console.error(exception);
});

const port = process.env.PORT || config.DEFAULT_API_PORT;
app.listen(port, (err, done) => {
  console.log(`Server started on port ${port}!`);
});

module.exports = app;
