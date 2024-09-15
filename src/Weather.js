import React, { useState } from "react";
import axios from "axios";

export default function Weather() {
    let [city, setCity] = useState("");
    let [weather, setWeather] = useState(null);
    let [submit, setSubmit] = useState(false);

    function showWeather(response) {
        setSubmit(true);
        setWeather({
            temperature: response.data.main.temp,
            wind: response.data.wind.speed,
            humidity: response.data.main.humidity,
            icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
            description: response.data.weather[0].description,
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        const apiKey = "f5e814a04eddfab1740f07bf0328eee2";
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        axios.get(apiUrl).then(showWeather);
    }

    function updateCity(event) {
        setCity(event.target.value);
    }
    let form = ( <
        form onSubmit = { handleSubmit } >
        <
        input type = "search"
        onChange = { updateCity }
        /> <
        input type = "submit"
        value = "search" / >
        <
        /form>
    );

    if (submit) {
        return ( <
            div > { form } <
            ul >
            <
            li > Temperature: { Math.round(weather.temperature) }℃ < /li> <
            li > Description: { weather.description } < /li> <
            li > Humidity: { weather.humidity } % < /li> <
            li > Wind: { weather.wind }
            km / hr < /li> <
            li >
            <
            img src = { weather.icon }
            alt = { weather.description }
            /> < /
            li > <
            /ul> < /
            div >
        );
    } else {
        return <div > { form } < /div>;
    }
}