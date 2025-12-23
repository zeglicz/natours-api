const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllTours = (req, res) => {
  console.log(req.reqestTime);
  res.status(200).json({
    status: 'success',
    results: tours.length,
    requestedAt: req.reqestTime,
    data: { tours },
    // data: { tours: tours },
  });
};

exports.getTour = (req, res) => {
  // console.log(req.params);
  const id = Number(req.params.id);
  const tour = tours.find((t) => t.id === id);

  if (!tour)
    return res.status(404).json({
      status: 'fail',
      messsage: 'Invalid ID',
    });
  // console.log(tour);

  res.status(200).json({
    status: 'success',
    data: { tour },
  });
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: { tour: newTour },
      });
    }
  );

  // console.log(req.body);
  // We always need to send back something in order to finish the so-called request/response cycle
  // res.send('Done');
};

exports.updateTour = (req, res) => {
  if (Number(req.params.id) > tours.length)
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here…>',
    },
  });
};

exports.deleteTour = (req, res) => {
  if (Number(req.params.id) > tours.length)
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });

  res.status(204).json({
    status: 'success',
    data: null,
  });
};
