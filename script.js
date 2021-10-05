// Selecting html elements for edit
var searchList = document.getElementById("searchlist")
var tempText = document.createElement("li")
var humidText = document.createElement("li")
var windText = document.createElement("li")
var uvText = document.createElement("li")


// Search from search history: calls display function
function pastSearch(location){
    console.log("1")
    
    var url="https://api.openweathermap.org/data/2.5/weather?q="+location+"&appid=7a35162ff8a1ab9814d70cac9d534864"
    console.log("pastseach: "+url)

    Display(url)

}

// Search from input bar: calls display function and creates search history
function searchInput(){


    var form1 = document.getElementById("form1")
    form1.addEventListener("submit", function(event){event.preventDefault()})

    var inputText = document.getElementById("inputtext")
    console.log(inputText.value)
    
    
    var url="https://api.openweathermap.org/data/2.5/weather?q="+inputText.value+"&appid=7a35162ff8a1ab9814d70cac9d534864"
    console.log(url)
    
    Display(url)

    var createCard = document.createElement("button")
    createCard.setAttribute("class", "searched")
    createCard.textContent = inputText.value
    createCard.addEventListener("click", function(){pastSearch(createCard.textContent)})
    console.log(createCard)

    searchList.appendChild(createCard)

}

// The function that displays data on dashboards, calls the main function oneCall()
function Display(url){

    fetch(url)
        
        .then(function (response) {

            return response.json();
        })
        .then(function (data) {

            console.log("data", data)
            
            var currentTitle = document.getElementById("currentTitle")
            currentTitle.textContent = data.name+" ("+moment().format("MMM Do YYYY")+")"
            
            var longitude = data.coord.lon
            var latitude = data.coord.lat
            console.log(longitude, latitude)

            var OCurl = "https://api.openweathermap.org/data/2.5/onecall?lat="+latitude+"&lon="+longitude+"&appid=7a35162ff8a1ab9814d70cac9d534864"
            oneCall(OCurl)
            
        })
}

// Main data retrieving and displaying function
function oneCall(url){

    fetch(url)
        
        .then(function (OCresponse) {

            return OCresponse.json();

        })
        .then(function (data) {
            console.log("onecall", data)
            
            var currentList = document.getElementById("currentList")
            var currentIcon = document.getElementById("weathericon")

            console.log(data.current.weather[0].icon)

            var weatherIcon = "http://openweathermap.org/img/w/"+data.current.weather[0].icon+".png"
            currentIcon.setAttribute("src", weatherIcon)
            
            
            var tempC = parseFloat(data.current.temp)-271
            tempText.textContent = "Temperature: " + tempC.toFixed(2)+"\u00B0C"
            
            humidText.textContent = "Humidity: " +data.current.humidity + "%"

            windText.textContent = "Wind Speed: "+ data.current.wind_speed + "m/s"

            if(data.current.uvi<2){
                uvText.innerHTML = "UV index: "+"<span id=\"uvLow\">"+data.current.uvi+"</span>"
            }

            else if(data.current.uvi<5){
                uvText.innerHTML = "UV index: "+"<span id=\"uvModerate\">"+data.current.uvi+"</span>"
            }

            else if(data.current.uvi<7){
                uvText.innerHTML = "UV index: "+"<span id=\"uvHigh\">"+data.current.uvi+"</span>"
            }

            else if(data.current.uvi<10){
                uvText.innerHTML = "UV index: "+"<span id=\"uvVeryhigh\">"+data.current.uvi+"</span>"
            }

            else{
                uvText.innerHTML = "UV index: "+"<span id=\"uvExtreme\">"+data.current.uvi+"</span>"
            }

            

            currentList.appendChild(tempText)
            currentList.appendChild(humidText)
            currentList.appendChild(windText)
            currentList.appendChild(uvText)

            var foreDateText = document.getElementsByClassName("foreDate")
            var foreIconSrc = document.getElementsByClassName("foreIcon")
            var foreTempText = document.getElementsByClassName("foreTemp")
            var foreHumText = document.getElementsByClassName("foreHum")
            console.log(foreIconSrc)

            for (i=0;i<foreDateText.length;i++){
                foreDateText[i].textContent = moment.unix(data.daily[i+1].dt).format("MMM Do YYYY")
            }

            for (i=0;i<foreIconSrc.length;i++){

                var iconIndex = "http://openweathermap.org/img/w/"+data.daily[i+1].weather[0].icon+".png" 
                foreIconSrc[i].setAttribute("src", iconIndex)
            }

            for (i=0;i<foreTempText.length;i++){
                
                var tempCel = parseFloat(data.daily[i+1].temp.day)-271
                foreTempText[i].textContent = "Temp: "+tempCel.toFixed(2)+"\u00B0C"

            }
            
            for (i=0;i<foreHumText.length;i++){
                console.log(data.daily[i+1].humidity)
                foreHumText[i].textContent = "Humidity: "+ data.daily[i+1].humidity+"%"
            }
                
                
        })
}
