
$("#searchBtn").on("click", function (e) {
    e.preventDefault();
    let searchTerm = $("#textarea1").val()
    beerQuery(searchTerm);
    weatherQuery(searchTerm);


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


              

                var card = $("<div>")
                card.attr("class", "card blue-grey darken-1")
                var card1 = $("<div>")
                card1.attr("class", "card-content white-text")
                var brewName = $("<span>")
                brewName.attr("class", "card-title").text(breweryName)
                var brewStreet = $("<p>")
                brewStreet.text(breweryAdd)

                card1.append(brewName, brewStreet)
                card.append(card1)
                $("#results").append(card)

            }
        })

}
function weatherQuery(searchTerm) {

    let weatherQueryURL = "https://api.openweathermap.org/data/2.5/weather?zip=" +searchTerm+ ",us&units=imperial&appid=6e386d169b465bbe84362a63b6f2a0b8"

    $.ajax({
        url: weatherQueryURL,
        method: "GET"
    })

        .then(function (response) {
            console.log(response)
        })


}