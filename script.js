$("#searchBtn").on("click", function (e) {
    let searchTerm;
    $("#returnBtn").html("");
    e.preventDefault();
    $("#page2").attr("style", "display: block");
    $("#page1").attr("style", "display: none");
    let returnButton = $("<button>").attr("class", "blue-grey darken-1 btn").append("Back");
    $("#returnBtn").append(returnButton);
    if ($("#textarea1").val() > 0){
        searchTerm = $("#textarea1").val()
        beerQuery(searchTerm);
        $("body").addClass("BarrelBackGround");
        $("body").removeClass("brickBackground");
    }else{
        beerQuery(searchTerm);
        $("body").addClass("BarrelBackGround");
        $("body").removeClass("brickBackground");
    }
    // console.log(searchTerm);


});
function beerQuery(searchTerm) {
    let beerQueryURL = "https://api.openbrewerydb.org/breweries?by_postal=" + searchTerm
    $.ajax({
        url: beerQueryURL,
        method: "GET"
    })
        .then(function (response) {
            $("#results").html("");
            // console.log(response)
            returnedBreweries = response
            if (returnedBreweries.length) {
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
                weatherQuery(searchTerm);
                forecastQuery(searchTerm);
            } else if (searchTerm === undefined) {
                $("#forecast").html("");
                $("#weather").html("")
                var sorry = $("<div>")
                

                sorry.attr("class", "card blue-grey darken-1")
                var sorry1 = $("<div>")
                sorry1.attr("class", "card-content white-text")
                var sorry2 = $("<span>")
                sorry2.attr("class", "card-title").text("Sorry :(")
                var tacoBell = $("<p>")
                tacoBell.text("It appears there are no eligible breweries in your area. Why not try Taco Bell?")
                sorry1.append(sorry2, tacoBell)
                sorry.append(sorry1)
                $("#results").append(sorry)
            }
            else {
                $("#forecast").html("");
                $("#weather").html("")
                // console.log("No Breweries")
                var sorry = $("<div>")


                sorry.attr("class", "card blue-grey darken-1")
                var sorry1 = $("<div>")
                sorry1.attr("class", "card-content white-text")
                var sorry2 = $("<span>")
                sorry2.attr("class", "card-title").text("Sorry")
                var tacoBell = $("<p>")
                tacoBell.text("It appears there are no eligible breweries in your area :( why not try Taco Bell?")
                sorry1.append(sorry2, tacoBell)
                sorry.append(sorry1)
                $("#results").append(sorry)
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
            let temp = returnedWeather.main.temp
            let humid = returnedWeather.main.humidity
            let icon = returnedWeather.weather[0].icon
            console.log(icon);
            var cardContainer = $("<div>")
            cardContainer.attr("class", "col s10  m3 offset-s1")
            var card = $("<div>")
            card.attr("class", "col s10  m3 offset-s1 card blue-grey darken-1")
            var card1 = $("<div>")
            card1.attr("class", "card-content white-text")
            var City = $("<span>")
            City.attr("class", "card-title").text(cityNM)
            var cardtemp = $("<p>")
            var iconAppend = $("<div>")
            iconAppend.attr("class", "car-text").append("<img src = 'http://openweathermap.org/img/wn/" + icon + "@2x.png'></img>")
            cardtemp.text("Temp: " + temp + " Degrees")
            var cardhumid = $("<p>")
            cardhumid.text("Humidity: " + humid + "%")
            card1.append(City, cardtemp, cardhumid, iconAppend)
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
            returnedForecast = response.list.slice(0, 24)
            // console.log(returnedForecast)
            var wTime = returnedForecast[0].dt_txt.substring(11);
            // console.log(wTime);
            for (let i = 0; i < 24; i++) {
                let forecast = returnedForecast[i];
                if (forecast.dt_txt.substring(11) === "18:00:00") {
                    forecastTemp = forecast.main.feels_like
                    forecastHumid = forecast.main.humidity
                    forecastTime = forecast.dt_txt.slice(5, 10) + "-" + forecast.dt_txt.slice(0, 4)
                    // console.log(forecastTime);
                    var card = $("<div>")
                    card.attr("class", "col s10  m3 offset-s1 card blue-grey darken-1")
                    var card1 = $("<div>")
                    card1.attr("class", "card-content white-text")
                    var fTime = $("<span>")
                    fTime.attr("class", "card-title").text(forecastTime + " At 6:00 PM")
                    var fTemp = $("<p>")
                    fTemp.text("Feels like " + forecastTemp)
                    var fHumid = $("<p>")
                    fHumid.text("Projected Humidity " + forecastHumid + "%")
                    card1.append(fTime, fTemp, fHumid)
                    card.append(card1)
                    $("#weather").append(card)
                }
            }
        })
}
$("#returnBtn").on("click", function () {
    $("#page2").attr("style", "display: none");
    $("#page1").attr("style", "display: block");
    $("body").addClass("brickBackground");
    $("body").removeClass("BarrelBackGround");
})