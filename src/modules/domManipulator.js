import "../style.css";

export const changeWeather = (element, temp) => {
    element.textContent = temp+"°";
}

export const updateElement = (element, text) => {
    element.textContent = text;
}

export const updateHourlyForecast = (card) => {
    const forecast = document.querySelector("#hourlyForecast");
    forecast.appendChild(card);
}

export const updateWeeklyForecast = (card) => {
    const forecast = document.querySelector("span");
    forecast.appendChild(card);
}

export const clearContent = (content) => {
    content.replaceChildren();
}