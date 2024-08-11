

export const requestWeather = async() => {

    const apiKey = "84JZF938TKUQX74B2ZSLA2WET";
    var location = "London%2CUk"; // potentially pass in at later time to modify
    var units = "metric"; // metric, US, UK
    var reqData = "datetimeEpoch%2Cname%2CresolvedAddress%2Ctempmax%2Ctempmin%2Cfeelslike%2Chumidity%2Cprecipprob%2Cwindspeed%2Cuvindex%2Cdescription%2Cicon"; // specifys data to request
    var request = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/next7days?unitGroup=${units}&elements=${reqData}&key=${apiKey}&contentType=json`;

    // Fetch the request and parse as .json - THEN return to program after converting to .json
    fetch(request, {mode: "cors"})
    .then((response) => {
        return response.json();
    })
    .then((weather) => {
        console.log("weather is, ", weather);
        console.log("Days array: 22", weather.days);
        return weather;
    })
    .catch(() => {
        console.error("Could not load weather API");
    });
}