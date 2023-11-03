import React, { Component } from 'react';
import axios from 'axios';

class FlightList extends Component {
  constructor() {
    super();
    this.state = {
      data: null, // Initialize data as null
      error: null, // Initialize error as null
    };
  }

  

  componentDidMount() {
    // Replace 'YOUR_API_KEY' with your actual FlightAware API key
    const apiKey = 'nGQs12sl50pc94piX4AxqLOa0NUbvrtk';
    
    // Construct the API URL for flight tracking data (replace with the desired endpoint)
    const flightId = 'D82845'; // Replace with the desired flight ID
   // const apiUrl = `https://aeroapi.flightaware.com/aeroapi/flight/track/${flightId}`;

    // Set up headers with your API key
    const headers = {
      'Authorization': `Bearer ${apiKey}`,
    };

    const apiUrl = 'http://localhost:3001/aeroapi';

    axios
      .get(apiUrl, { headers })
      .then((response) => {
        this.setState({
          data: response.data, // Assuming the API response is an object with flight tracking data
        });
      })
      .catch((error) => {
        console.error('Error fetching flight data:', error);
      });
  }

  render() {
    const { data, error } = this.state;

    return (
      <div id="renderiranje">
        <h1>Flight Tracking Data</h1>
        {error ? (
          <p>Error: {error}</p>
        ) : (
          <pre>{JSON.stringify(data, null, 2)}</pre>
        )}
      </div>
    );
  }
}

export default FlightList;
