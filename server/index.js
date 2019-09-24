const newrelic = require('newrelic');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const host = 'localhost:3003';
app.locals.newrelic = newrelic;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/restaurants/:rid', express.static(path.join(__dirname, '../public')));

app.get('/api/restaurants/:rid/availability' , (req, res) => {
    console.log("Proxy query: ", req.params.rid, req.query)
    res.redirect(`http://${host}/api/restaurants/${req.params.rid}/availability?date=${req.query.date}&time=${req.query.time}&seats=${req.query.seats}`);
});

app.listen(3000, function() {
    console.log('Listening on Port 3000...');
});

