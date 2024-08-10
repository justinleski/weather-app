import "./style.css";

const changeWeather = (text, temp) => {
    // Text is the selected HTML tag
    // text.classList.add("temp");
    text.textContent = temp+"°";
}

const changeLocation = (text, location) => {
    text.textContent = location;
}
