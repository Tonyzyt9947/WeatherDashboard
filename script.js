var searchList = document.getElementById("searchlist")

console.log("hey")

function pastSearch(location){
    console.log("1")
    
    var url="https://api.openweathermap.org/data/2.5/weather?q="+location+"&appid=7a35162ff8a1ab9814d70cac9d534864"
    console.log("pastseach: "+url)
    
    Display(url)

}

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

function Display(url){

    fetch(url)
        
        .then(function (response) {

          return response.json();
        })
        .then(function (data) {
            console.log("data",data)
            
        })
}
