const mongoose = require('mongoose');
require('mongoose-long')(mongoose);

const { MONGODB_URI } = process.env;

mongoose.connect(MONGODB_URI, {
  autoIndex: false,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

mongoose.connection.on('error', err => {
  console.error('MongoDB connection error.');
  console.error(err);
  process.exit();
});

mongoose.connection.once('open', () => {
  console.log(`Connected to MongoDB: ${MONGODB_URI}`);
});

const Counter = require('../models/counter');

(async () => {
  const counters = ['test'];

  await Promise.all(
    counters.map(async counter => {
      const existCounter = await Counter.findById(counter);
      if (!existCounter) await Counter.create({ _id: counter, sequence: 0 });
    }),
  );
})();
