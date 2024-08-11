import "../style.css";

export const changeWeather = (element, temp) => {
    // Text is the selected HTML tag
    // text.classList.add("temp");
    element.textContent = temp+"°";
}

export const changeLocation = (element, location) => {
    element.textContent = location;
}

export const changeDesc = (element, desc) => {
    element.textContent = desc;
}
