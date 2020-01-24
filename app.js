window.addEventListener('load', () => {
    let long;
    let lat;

    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
        long = position.coords.longitude;
        lat = position.coords.latitude;

        const proxy = `https://cors-anywhere.herokuapp.com/`;
        const api = `${proxy}https://api.darksky.net/forecast/dc4e745da1ce2b96e9b93fd92d31d65a/${lat},${long}`
        
        
        fetch(api)
        .then(response =>{
            return response.json();
        })
        .then(data =>{
            console.log(data);
            const {temperature, summary, icon} = data.currently;
            temperatureDegree.textContent = temperature + ' F';
            temperatureDescription.textContent = summary;
            locationTimezone.textContent = data.timezone;

            setIcons(icon, document.querySelector('.icon'));
        });

    
    });


    }else{
        h1.textContent="hey this is now working because you need to enable geolocation"
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color:"white"});
        const currentIcon = icon.replace(/-/g,"_").toUpperCase();
        skycons.play();

        return skycons.set(iconID, Skycons[currentIcon]);
    }
});