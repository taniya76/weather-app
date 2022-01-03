import React from "react"
import { fetchWeather } from "./utils/api"
import ReactDOM from 'react-dom';
import _ from "lodash"
import randomColor from "randomcolor";

import WeekWeather from "./components/WeekWeather"

import './css/newStyle.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "Delhi",
      searchedCity: "Delhi",
      weekWeather: []
    };
  }

  componentWillMount() {
    this.getWeather();
  }

  getWeather(searchedCity = this.state.city) {
    fetchWeather(searchedCity)
      .then((response) => {
        var weather = _.map(response.list, (dayWeather) => {
          return {
            dayWeather,
            country: response.city.country,
            city: response.city.name
          }
        });
        console.log(weather);

        this.setState({
          weekWeather: weather,
          city: this.state.searchedCity,
          color: randomColor({ luminosity: "dark", format: "hex" })
        });
      })
  }

  render() {
    return <div className="weather-container"
      style={{ backgroundColor: this.state.color }}>
      {this._renderForm()}
      {_.isEmpty(this.state.weekWeather) ? "no data" :
        <WeekWeather color={this.state.color}
          weekWeather={this.state.weekWeather} />}

    </div>;
  }

  _renderForm() {
    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <fieldset>
          <legend>Enter your city</legend>
          <input className="form-input"
            ref="locationName"
            type="text"
            defaultValue={this.state.searchedCity} />
        </fieldset>
      </form>
    );
  }

  handleSubmit(e) {
    e.preventDefault();

    const searchedCity = ReactDOM.findDOMNode(this.refs.locationName).value;

    if (searchedCity === this.state.city) {
      return;
    }

    this.getWeather(searchedCity);
  }
};