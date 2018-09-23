(() => {
    let $h1 = document.querySelector('h1');
    let $latitud = document.querySelector('input[name=latitud]');
    let $longitud = document.querySelector('input[name=longitud]');
    let btnLocation = document.querySelector('input[name=btnLocation]');

    btnLocation.onclick = () => {
        const geoconfig = {
            enableHighAccuracy: true,
            timeout: '1000',
            maximunAge: 60000
        }
        navigator.geolocation.getCurrentPosition(mostrar, errores, geoconfig);
    }

    function mostrar(posicion) {
        $latitud.value = posicion.coords.latitude;
        $longitud.value = posicion.coords.longitude;
    }

    function errores(error) {
        alert(`Error! ${error.code} ${error.message}`);
    }

    let form = document.getElementsByTagName('form')[0].onsubmit = (event) => {
        event.preventDefault();
        let latitud = $latitud.value.trim();
        let longitud = $longitud.value.trim();

        $h1.innerHTML = 'Loading...';

        var req = new XMLHttpRequest();
        req.open('GET', `/latitud/${latitud}/longitud/${longitud}`, true);
        req.send();
        req.onreadystatechange = function () {
            if (this.readyState === 4) {
                try {
                    handleAjax(this.status, JSON.parse(this.responseText));
                } catch (error) {
                    $h1.innerHTML = 'Error!';
                    console.error(error);
                }
            }
        };

        function handleAjax(status, data) {
            if (status === 200) {
                let temperature = data.temperature;

                $h1.innerHTML = `The temperature in ${data.timezone} is ${temperature}&#176 Fahrenheit; in latitude ${latitud} and longitude ${longitud}`;
            }
        }
    }

})()