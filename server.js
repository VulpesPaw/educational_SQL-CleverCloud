/* --------------------------------- Import --------------------------------- */

const express = require('express');

const app = express();

const { index, store, update, destroy, search } = require('./controlers');

const PORT = process.env.PORT || 3688;

// const PORT = 3688;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/* --------------------------------- Routes --------------------------------- */
app.get('/quotes', index);
app.get('/quotes/:id', (req, res) => {});
app.get('/quotes/search/:s', search);

app.post('/quotes', store);
app.put('/quotes/:id', update);
app.delete('/quotes/:id', destroy);

/* --------------------------------- Listen --------------------------------- */

app.listen(PORT);
