const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

// connecting to the local database:
mongoose.connect(process.env.DATABASE_LOCAL);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('app running on port', port);
});
