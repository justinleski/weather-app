# weather-app

### Purpose
A simple weather app to experiment with making API calls.
- Supports a search function which allows the user to check the weather of any location they desire
- Has both an hourly forecast and forecast for the following 7 days

### Demo
![Demo of the weather app switching between locations and updating location info.](assets/demo/weatherAppDemo.gif)
Try out the live demo [here](https://justinleski.github.io/weather-app/).

### Challenges Faced
- Deploying this app to GitHub Pages posed a challenge as I had to refactor the code to use the imported images instead of the filepath
    - Using the direct filepath does not work with a bundler like Webpack
- Making API calls

#### Dynamic Imports
- Using a bundler like Webpack posed a few challenges, particularly the import statement
- Most objects have a `.toString()` method that will get called when assigning and img's `src` attribute
    - The namespace module object the *dynamic* import returns does not have this method built in
    - Hence, leading to a TypeError
        - The browser tries to convert it to a string but has no way of doing so

