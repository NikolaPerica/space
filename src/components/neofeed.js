import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class NeoFeed extends Component {
  constructor() {
    super();
    this.state = {
      neoData: null,
      error: null,
      startDate: new Date(),
      endDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000), // Set the end date to the next day
    };
  }

  componentDidMount() {
    this.fetchNeoData();
  }

  fetchNeoData() {
    const apiKey = '4V3jYNGi2bKyWAauYFqdmuOWP7ZBhTgP9PfjnCUE';
    const { startDate, endDate } = this.state;
    const formattedStartDate = startDate.toISOString().slice(0, 10);
    const formattedEndDate = endDate.toISOString().slice(0, 10);
    const apiUrl = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${formattedStartDate}&end_date=${formattedStartDate}&api_key=${apiKey}`;

    axios
      .get(apiUrl)
      .then((response) => {
        this.setState({
          neoData: response.data,
        });
      })
      .catch((error) => {
        console.error('Error fetching NEO data:', error);
        this.setState({
          error: 'Failed to fetch NEO data',
        });
      });
  }

  handleStartDateChange = (date) => {
    // Calculate the end date as the next day from the selected start date
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    this.setState({ startDate: date, endDate: nextDay, neoData: null }, this.fetchNeoData);
  };

  render() {
    const { neoData, error, startDate, endDate } = this.state;

    return (
      <div id="renderiranje">
        <h1>Near Earth Object Feed</h1>
        <div>
          <DatePicker
            selected={startDate}
            onChange={this.handleStartDateChange}
            dateFormat="dd/MM/yyyy" // Set the date format to "dd mm yyyy"
          />
          {neoData ? null : (
            <DatePicker
              selected={endDate}
              disabled
              dateFormat="dd/MM/yyyy" // Set the date format to "dd mm yyyy"
            />
          )}
        </div>
        {error ? (
          <p>Error: {error}</p>
        ) : neoData ? (
          <div>
            <h2>NEO Information:</h2>
            <ul>
              {Object.keys(neoData.near_earth_objects).map((date) => (
                <div key={date}>
                  <h3> </h3>
                  <ul>
                    {neoData.near_earth_objects[date].map((neo) => (
                      <li key={neo.id}>
                        <h3>NEO Details</h3>
                        <p><strong>Name:</strong> {neo.name}</p>
                        <p><strong>Absolute Magnitude (H):</strong> {neo.absolute_magnitude_h}</p>
                        <p><strong>NASA JPL URL:</strong> <a href={neo.nasa_jpl_url} target="_blank" rel="noopener noreferrer">Visit JPL</a></p>
                        <p><strong>Estimated Diameter:</strong> {neo.estimated_diameter.kilometers.estimated_diameter_min} - {neo.estimated_diameter.kilometers.estimated_diameter_max} kilometers</p>
                        <p><strong>Is Potentially Hazardous Asteroid:</strong> {neo.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}</p>
                        <h3>Close Approach Data</h3>
                        {neo.close_approach_data.map((approach, index) => (
                            <div key={index}>
                            <p><strong>Close Approach Date and Time:</strong> {approach.close_approach_date_full}</p>
                            <p><strong>Relative Velocity:</strong> {approach.relative_velocity.kilometers_per_second} km/s</p>
                            <p><strong>Miss Distance:</strong> {approach.miss_distance.kilometers} kilometers</p>
                            <p><strong>Orbiting Body:</strong> {approach.orbiting_body}</p>
                            </div>
                        ))}
                        <p><strong>Is Sentry Object:</strong> {neo.is_sentry_object ? 'Yes' : 'No'}</p>
    
                        <br />
                        <br />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </ul>
          </div>
        ) : (
          <p>Loading NEO data...</p>
        )}
      </div>
    );
  }
}

export default NeoFeed;
