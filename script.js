var searchList = document.getElementById("searchlist")

function start(){


    var inputText = document.getElementById("inputtext")
    console.log(inputText.value)
    
    url="https://api.openweathermap.org/data/2.5/weather?q="+inputText.value+"&appid=7a35162ff8a1ab9814d70cac9d534864"
    console.log(url)
    fetch(url)
        
        .then(function (response) {

          return response.json();
        })
        .then(function (data) {
            console.log("data",data)
            
            var createCard = document.createElement("section")
            createCard.setAttribute("class", "searched")
            createCard.textContent = inputText.value
            console.log(createCard)

            searchList.appendChild(createCard)

            
            
            }
          );
      
    

}





