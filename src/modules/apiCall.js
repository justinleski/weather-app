

export const requestWeather = async(searchQuery) => {

    const apiKey = "84JZF938TKUQX74B2ZSLA2WET";
    var location = searchQuery; // potentially pass in at later time to modify
    var units = "metric"; // metric, US, UK
    var reqData = "datetimeEpoch%2Cname%2CresolvedAddress%2Ctempmax%2Ctempmin%2Cfeelslike%2Chumidity%2Cprecipprob%2Cwindspeed%2Cuvindex%2Cdescription%2Cicon"; // specifys data to request
    var request = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/next7days?unitGroup=${units}&elements=${reqData}&key=${apiKey}&contentType=json`;

    // Use variable for request to create weather object and return
    const response = await fetch(request, {mode: "cors"});
    const weatherObj = await response.json();
    return weatherObj;
}