const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('UNCAUGHT EXPCEPTION ');
  server.close(() => {
    process.exit(1);
  });
});

dotenv.config({ path: './config.env' });
const app = require('./app');

// connecting to the local database:
mongoose
  .connect(process.env.DATABASE_LOCAL)
  .then(() => console.log('DB conntected successfully!'))
  .catch((err) => console.log('ERROR'));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('app running on port', port);
  // console.log(process.env);
});
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION');
  server.close(() => {
    process.exit(1);
  });
});
