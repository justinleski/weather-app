import "../style.css";

export const changeWeather = (element, temp) => {
    // Text is the selected HTML tag
    // text.classList.add("temp");
    element.textContent = temp+"°";
}

export const updateElement = (element, text) => {
    element.textContent = text;
}
