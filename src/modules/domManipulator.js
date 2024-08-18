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

// export const showRainChance = (card, chance) => {
//     card.style.display = "flex";
//     card.style.flexDirection = "column";
    

//     const precipProb = document.createElement("p");
//     precipProb.textContent = chance+"%";
//     precipProb.classList.add("precip");


//     card.appendChild(precipProb);
// }