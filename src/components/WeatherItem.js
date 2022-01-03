import React from "react"
import Skycons from "react-skycons"
import Moment from "moment"
import NumberEasing from "react-number-easing"
import {getIcon}  from "./../utils/getIcon"


export default class WeatherItem extends React.Component {
    
    render() {
        let weather = this.props.data,
            country = weather.country,
            city = weather.city,
            humidity = weather.dayWeather.humidity,
            minTemperature = weather.dayWeather.temp.min,
            maxTemperature = weather.dayWeather.temp.max,
            weatherDescription = weather.dayWeather.weather[0].main,
            icon = weather.dayWeather.weather[0].id;

        return <div className="weather-item">
            <p className="location">
                <span className="city">{city}</span>
                <span className="country">{country ? `, ${country}` : null}</span>
            </p>
            <Skycons color='white' type={getIcon(icon)} />
        
            
            {this._renderDayName()}

            <div>
                <p >
                    <NumberEasing value={Math.round(minTemperature)}
                        speed={1000}
                        ease='circInOut' />
                    °/
                    <NumberEasing value={Math.round(maxTemperature)}
                        speed={1000}
                        ease='circInOut' />
                    °C
                </p>
                <p>Humidity: {humidity}</p>
                <p >{weatherDescription}</p>
            </div>
        </div>
    }

    _renderDayName() {
        let days = {
            sameDay: "[Today]",
            nextDay: "ddd",
            nextWeek: "ddd",
            lastDay: "ddd",
            lastWeek: "ddd"
        }

        return <p className="timestamp">
            {Moment(this.props.data.dayWeather.dt * 1000).calendar(null, days)}
        </p>
    }
}