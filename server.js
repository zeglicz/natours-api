const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const mongoose = require('mongoose');
const app = require('./app');

const DB = process.env.MONGO_DB.replace(
  '<PASSWORD>',
  process.env.MONGO_DB_PASSWORD,
);

mongoose.connect(DB).then(() => console.log('DB connection successful!'));

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: { type: Number, default: 4.5 },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
  name: 'The Park Camper',
  // rating: 4.7,
  price: 997,
});

testTour
  .save()
  .then((doc) => console.log(doc))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}…`);
});
