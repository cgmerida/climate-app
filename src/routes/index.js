const express = require('express');
const router = express.Router();
const ForecastIo = require('forecastio');
const weather = new ForecastIo('299a6cb1f262aa029d42967e7c87b0ea');

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/latitud/:latitud/longitud/:longitud', (req, res, next) => {
    console.log(req.params.latitud, req.params.longitud);
    if (!req.params.latitud || !req.params.longitud) {
        res.status(404).json({
            msg: 'error'
        });
    }

    let latitud = parseInt(req.params.latitud, 10);
    let longitud = parseInt(req.params.longitud, 10);

    weather.forecast(latitud, longitud, (err, data) => {
        console.log(data);
        if (err){
            next();
            return;
        }
        res.json({
            temperature: data.currently.temperature,
            timezone: data.timezone
        })
    });
});

module.exports = router;