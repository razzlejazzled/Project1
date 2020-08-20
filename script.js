
$("#searchBtn").on("click", function (e) {
    e.preventDefault();
    let searchTerm = $("#textarea1").val()
    beerQuery(searchTerm);
    weatherQuery(searchTerm);
    forecastQuery(searchTerm);


})
function beerQuery(searchTerm) {



    let beerQueryURL = "https://api.openbrewerydb.org/breweries?by_postal=" + searchTerm

    $.ajax({
        url: beerQueryURL,
        method: "GET"
    })

        .then(function (response) {
            $("#results").html("");
            console.log(response)
            returnedBreweries = response
            for (let i = 0; i < returnedBreweries.length; i++) {
                let brewery = returnedBreweries[i];
                breweryName = brewery.name
                breweryAdd = brewery.street
                breweryType = brewery.brewery_type
                breweryPhone = brewery.phone
                breweryCity = brewery.city
                brewerySite = brewery.website_url




                var card = $("<div>")
                card.attr("class", "card blue-grey darken-1")
                var card1 = $("<div>")
                card1.attr("class", "card-content white-text")
                var brewName = $("<span>")
                brewName.attr("class", "card-title").text(breweryName)
                var brewType = $("<p>")
                brewType.text("Brewery Type: " + breweryType)
                var brewPhone = $("<p>")
                brewPhone.text(breweryPhone)
                var brewStreet = $("<p>")
                brewStreet.text(breweryAdd)
                var brewCity = $("<p>")
                brewCity.text(breweryCity)
                var brewlink = $("<a>")
                brewlink.attr("href", brewerySite)
                brewlink.attr("class", "card-action").text(brewerySite)

                card1.append(brewName, brewType, brewPhone, brewStreet, brewCity, brewlink)
                card.append(card1)
                $("#results").append(card)

            }
        })

}
function weatherQuery(searchTerm) {

    let weatherQueryURL = "https://api.openweathermap.org/data/2.5/weather?zip=" + searchTerm + ",us&units=imperial&appid=6e386d169b465bbe84362a63b6f2a0b8"

    $.ajax({
        url: weatherQueryURL,
        method: "GET"
    })

        .then(function (response) {
            $("#weather").html("")
            console.log(response)
            returnedWeather = response
            let cityNM = returnedWeather.name
            console.log(cityNM)
            let temp = returnedWeather.main.temp
            let humid = returnedWeather.main.humidity

            var card = $("<div>")
            card.attr("class", "card blue-grey darken-1")
            var card1 = $("<div>")
            card1.attr("class", "card-content white-text")
            var City = $("<span>")
            City.attr("class", "card-title").text(cityNM)
            var cardtemp = $("<p>")
            cardtemp.text("Temperature: " + temp)
            var cardhumid = $("<p>")
            cardhumid.text("Humidity: " + humid)


           
            card1.append(City, cardtemp, cardhumid)
            card.append(card1)
            $("#weather").append(card)
        })


}
function forecastQuery(searchTerm) {

    let forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?zip=" + searchTerm + ",us&units=imperial&appid=6e386d169b465bbe84362a63b6f2a0b8"

    $.ajax({
        url: forecastQueryURL,
        method: "GET"
    })

        .then(function (response) {
            $("#forecast").html("");
            console.log(response)
            returnedForecast = response.list.slice(0, 24)
            for (let i = 0; i < 24; i++) {
                let forecast = returnedForecast[i];

                
                forecastTemp = forecast.main.feels_like
                forecastHumid = forecast.main.humidity
                forecastTime = forecast.dt_txt
                


                var card = $("<div>")
                card.attr("class", "card blue-grey darken-1")
                var card1 = $("<div>")
                card1.attr("class", "card-content white-text")
                var fTime = $("<span>")
                fTime.attr("class", "card-title").text(forecastTime)
                var fTemp = $("<p>")
                fTemp.text("Feels like " + forecastTemp)
                var fHumid = $("<p>")
                fHumid.text("Projected Humidity " + forecastHumid)

                card1.append(fTime, fTemp, fHumid)
                card.append(card1)
                $("#forecast").append(card)



            }
        })


}