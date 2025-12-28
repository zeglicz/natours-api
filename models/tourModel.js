const mongoose = require('mongoose');
const slugify = require('slugify');

// Everything else (properties) that is not in our schema will be ignored
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must a difficulty'],
    },
    ratingsAverage: { type: Number, default: 4.5 },
    ratingsQuantity: { type: Number, default: 0 },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    priceDiscount: Number,
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a description'],
    },
    description: { type: String, trim: true },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
  },
  {
    toJSON: { virtuals: true }, // add virtual values to output
    toObject: { virtuals: true },
  },
);

// Add virutal value - we cannot query them becouse there are not part of the database
tourSchema.virtual('durationWeeks').get(function () {
  return (this.duration / 7).toFixed(2);
});

// Document Middleware - pre (before): only work before .save() and .create() NOT .insertMany() etc.
// You can use callback pattern with next() or use async function
// if you use async, you can use await inside for someAsyncOperation()
tourSchema.pre('save', async function () {
  this.slug = slugify(this.name, { lower: true });
});

// tourSchema.pre('save', () => {
//   console.log('Will save document');
// });

// Document Middleware - post (after): only work after .save() and .create()
// tourSchema.post('save', (doc, next) => {
//   console.log(doc);
//   next();
// });

// tourSchema.post('save', async (doc) => {
//   console.log(doc);
// });

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;

// const testTour = new Tour({
//   name: 'The Park Camper',
//   // rating: 4.7,
//   price: 997,
// });

// testTour
//   .save()
//   .then((doc) => console.log(doc))
//   .catch((err) => console.error(err));
