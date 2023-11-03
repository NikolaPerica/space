import React, { Component } from 'react';
import axios from 'axios';

class NextLaunches extends Component {
  constructor() {
    super();
    this.state = {
      launches: [],
      error: null,
    };
  }

  componentDidMount() {
    axios
      .get('https://fdo.rocketlaunch.live/json/launches/next/5')
      .then((response) => {
        this.setState({ launches: response.data.result });
      })
      .catch((error) => {
        this.setState({ error: 'Failed to fetch launch data' });
      });
  }

  render() {
    const { launches, error } = this.state;

    return (
      <div>
        <h1><strong>Next Rocket Launches</strong></h1>
        {error ? (
          <p>Error: {error}</p>
        ) : (
          <ul>
            {launches.map((launch) => (
              <li key={launch.id}>
                <h2 class="text-3xl"><strong>{launch.name}</strong></h2>
                <p><strong>Provider:</strong> {launch.provider.name}</p>
                <p><strong>Vehicle:</strong> {launch.vehicle.name}</p>
                <p><strong>Launch Description:</strong> {launch.launch_description}</p>
                <p><strong>Launch Date:</strong> {launch.date_str}</p>
                <p><strong>Location: </strong>{launch.pad.location.name}, {launch.pad.location.country}</p>
                <p><strong>Quick Text: </strong>{launch.quicktext}</p>
                <a href={launch.quicktext}>More Info</a>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default NextLaunches;
