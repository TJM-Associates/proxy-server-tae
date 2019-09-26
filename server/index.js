const newrelic = require('newrelic');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const host = '54.215.234.24:3003';
app.locals.newrelic = newrelic;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/restaurants/:rid', express.static(path.join(__dirname, '../public')));

// GET reservation availability
app.get('/api/restaurants/:rid/availability' , (req, res) => {
  res.redirect(`http://${host}/api/restaurants/${req.params.rid}/availability?date=${req.query.date}&time=${req.query.time}&seats=${req.query.seats}`);
});

// GET restaurant info
app.get('/api/restaurants/:rid' , (req, res) => {
  res.redirect(`http://${host}/api/restaurants/${req.params.rid}`);
});

// POST restaurant reservation
app.post('/api/restaurants/:rid/reservations' , (req, res) => {
  res.redirect(307, `http://${host}/api/restaurants/${req.params.rid}/reservations`);
});

// GET restaurant images
app.get('/api/restaurants/:rid/images', (req, res) => {
  res.redirect(`http://54.193.42.82:3002/api/restaurants/r${req.params.rid}/images`)
});

// GET restaurant reviews
app.get('/api/restaurants/:rid/reviews', (req, res) => {
  res.redirect(`http://52.8.6.53:3001/restaurants/r${req.params.rid}/reviews`)
});

app.listen(3000, function() {
  console.log('Listening on Port 3000...');
});