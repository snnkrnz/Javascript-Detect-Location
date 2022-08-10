const button = document.querySelector("button");

button.addEventListener("click", ()=>{
    if(navigator.geolocation) {
        button.innerText = "Allow to detect location";
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
        button.innerText = "Your browser not support";
    }
})
// 61074dd3532c4f2aa00c297d65a3d5f2
function onSuccess(position){
    button.innerText = "Detecting your location...";
    let {latitude, longitude} = position.coords;
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=61074dd3532c4f2aa00c297d65a3d5f2`)
    .then(response => response.json()).then(result => {
        let allDetails = result.results[0].components;
        let {city, postcode, country, town} = allDetails;
        button.innerText = `${city} ${postcode}, ${town} - ${country}`;
        console.table(allDetails);
    }).catch(()=>{
        button.innerText = "Something went wrong";
    })
}

function onError(){
    if(error.code == 1){
        button.innerText = "You denied the request";
    }
    else if(error.code == 2){
        button.innerText = "Location not available";
    }
    else {
        button.innerText = "Something went wrong";
    }
    button.setAttribute("disabled", "true");
}