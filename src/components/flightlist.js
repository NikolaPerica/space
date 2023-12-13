import React, { Component } from 'react';
import axios from 'axios';

class FlightList extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
      error: null,
    };
  }

  componentDidMount() {
    const apiUrl = 'http://localhost:5000/v1/flights';

    axios
      .get(apiUrl)
      .then((response) => {
        this.setState({
          data: response.data,
        });
      })
      .catch((error) => {
        console.error('Error fetching flight data:', error);
        this.setState({
          error: 'Failed to fetch flight data',
        });
      });
  }

  render() {
    const { data, error } = this.state;

    return (
      <div style={{color:'white'}}>
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
