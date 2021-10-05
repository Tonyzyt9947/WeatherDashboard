var searchList = document.getElementById("searchlist")

console.log("hey")

function pastSearch(location){
    console.log("1")
    var searched = document.getElementsByClassName("searched")
    for (i=0;i<searched.length;i++){
        searched[i].addEventListener("click", function(event){event.preventDefault()})
        console.log("added"+i)
    }
    

    
    url="https://api.openweathermap.org/data/2.5/weather?q="+location+"&appid=7a35162ff8a1ab9814d70cac9d534864"
    console.log("pastseach: "+url)
    fetch(url)
        
        .then(function (response) {

          return response.json();
        })

}

function searchInput(){


    var form1 = document.getElementById("form1")
    form1.addEventListener("submit", function(event){event.preventDefault()})

    var inputText = document.getElementById("inputtext")
    console.log(inputText.value)
    
    
    url1="https://api.openweathermap.org/data/2.5/weather?q="+inputText.value+"&appid=7a35162ff8a1ab9814d70cac9d534864"
    console.log(url)
    
    Display(url)

    Create

}

function Display(url){

    fetch(url)
        
        .then(function (response) {

          return response.json();
        })
        .then(function (data) {
            console.log("data",data)
            
            

}

function createHistory(){
var createCard = document.createElement("section")
            createCard.setAttribute("class", "searched")
            createCard.textContent = inputText.value
            createCard.addEventListener("click", pastSearch(createCard.textContent))
            console.log(createCard)

            searchList.appendChild(createCard)

}
