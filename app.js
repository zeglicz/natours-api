const express = require('express');

const app = express();

app.get('/', (req, res) => {
  // Send HTML - default 200, if we don't specify exact status code
  // res.status(200).send('Hello from the server side!');
  res.status(200).json({
    message: 'Hello from the server side!',
    app: 'Natours',
  });
});

app.post('/', (req, res) => {
  res.send('You can post to this endpoint…');
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}…`);
});
