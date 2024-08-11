class Day {
    constructor(temp, humid, precip, uv, wind, time, icon, hourlyForecast){
        //this.address = address; 
        this.temp = temp;
        this.humid = humid; 
        this.precip = precip;
        this.uv = uv;
        this.wind = wind;
        this.time = time;
        this.icon = icon;
        this.hourlyForecast = hourlyForecast;
    }
}

export const createDay = (temp, humid, precip, uv, wind, time, icon, hourlyForecast) => {
    const day = new Day(temp, humid, precip, uv, wind, time, icon, hourlyForecast);
    return day;
}

