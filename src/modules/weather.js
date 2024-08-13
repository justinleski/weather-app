class Day {
    constructor(temp, humid, precip, uv, wind, time, icon, hourlyForecast, tempmax, tempmin){
        //this.address = address; 
        this.tempmax = tempmax;
        this.tempmin = tempmin;
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

export const createDay = (temp, humid, precip, uv, wind, time, icon, hourlyForecast, tempmax, tempmin) => {
    const day = new Day(temp, humid, precip, uv, wind, time, icon, hourlyForecast, tempmax, tempmin);
    return day;
}

