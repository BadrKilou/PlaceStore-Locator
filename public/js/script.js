mapboxgl.accessToken = 'pk.eyJ1Ijoia2FkZW1zYWhlciIsImEiOiJjazhkaGI5d2UwZWUyM2VveTgzandkbTI0In0.I77VKBpOWF77NiNTufOEBQ';
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11',
zoom: 4,
center: [-111.093735,34.048927]
});



map.addControl(new mapboxgl.NavigationControl())



// Get Places From Api

async function getPlaces(){
    const res = await fetch('/api');
    const data = await res.json();

    let places = data.data.map(place => (
        {
         type: 'Feature',
         geometry: {
             type: 'Point',
             coordinates: [place.location.coordinates[0], place.location.coordinates[1]]
         },
         properties: {
             city: place.location.city
         }
        }
    ));
    return places;
}

// Show Places On Map

async function showMap(){
    let places = await getPlaces();

    map.on('load', () => {
        map.loadImage(
            'https://img.icons8.com/cotton/2x/worldwide-location.png',
            function(error, image){
                if(error) throw error;
                map.addImage('cat', image);
            });

            map.addSource('api', {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: places
                }
            });

            map.addLayer({
                id: 'points',
                type: 'symbol',
                minzoom: 0, 
                source: 'api',
                layout: {
                'icon-allow-overlap': true,
                'text-allow-overlap': true,  
                'icon-size': 2,
                'text-field': '{city}', 
                'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                'text-offset': [0, 0.9],
                'text-anchor': 'top',
                'icon-image': 'cat',
                'icon-size': 0.12
                },

                paint: {
                    "text-color": "#f1f1f1",
                    
                },
            });
    });
}

showMap()
getPlaces()

const form = document.querySelector('form');
const search = document.querySelector('.search');
let max = 3



async function addPlace(e){
    e.preventDefault()
     if(search.value === '' || search.value.length <= max){
         showError('Please enter a valid Address')
         
     }  else{
        showSuccess('City Added Successfully')
     }
     const sendBody = {
         address: search.value
     };

     try{
         search.value = '';
         
         
         const res = await fetch('/api', {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify(sendBody)
         });

        if(res.status === 400){
            alert('network error')
            throw err
        }

        if(res.status === 200){
            return
        }

        // Retrieve Updated Data
        places = await getPlaces();

        map.getSource('api').setData({
            type: 'FeatureCollection',
            features: places
        });

     }  catch(err) {
         search.placeholder = 'networ error'
         search.style.border = '2px solid red'
         return;
     }
        
     
    
    }


function showError(error){
    const container = document.querySelector('.container');
    const erroDiv = document.createElement('div');
    erroDiv.appendChild(document.createTextNode(error))
    erroDiv.className = 'alert';
    container.insertBefore(erroDiv,form)

    setTimeout(clearError, 3000)

    function clearError(){
        document.querySelector('.alert').remove()
    }

}

function showSuccess(error){
    const container = document.querySelector('.container');
    const erroDiv = document.createElement('div');
    erroDiv.appendChild(document.createTextNode(error));
    erroDiv.className = 'success';
    container.insertBefore(erroDiv, form)

    setTimeout(clearSuccess, 3000)

    function clearSuccess(){
        document.querySelector('.success').remove()
    }
}

form.addEventListener('submit', addPlace)