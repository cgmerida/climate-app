const path = require('path');
const express = require('express');
const app = express();
const morgan = require('morgan');

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares
app.use(morgan('dev'));

// Routes
app.use(require('./routes/index.js'));

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
    res.status(404).end('404 No encontrado!');
});

app.listen(app.get('port'), () => {
    console.log('Example app listening on port', app.get('port'), '!');
});

//Run app, then load http://localhost:3000 in a browser to see the output.