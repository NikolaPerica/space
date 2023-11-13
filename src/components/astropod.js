import React, { Component } from 'react';
import axios from 'axios';

class Astropod extends Component {
  constructor() {
    super();
    this.state = {
      apodData: null,
    };
  }

  componentDidMount() {
    // Replace 'YOUR_API_KEY' with your NASA API key
    const apiKey = '4V3jYNGi2bKyWAauYFqdmuOWP7ZBhTgP9PfjnCUE';
    const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

    axios
      .get(apiUrl)
      .then((response) => {
        this.setState({ apodData: response.data });
      })
      .catch((error) => {
        console.error('Error fetching APOD data:', error);
      });
  }

  render() {
    const { apodData } = this.state;

    if (!apodData) {
      return <div className="h-screen flex items-center justify-center">Loading APOD data...</div>;
    }

    return (
      <div className="h-96 flex m-48 flex-col items-center justify-center" style={{color: '#C0C0C0'}}>
        <h1 className="text-3xl font-bold">{apodData.title}</h1>
        <img
          src={apodData.url}
          alt={apodData.title}
          className="max-w-lg object-scale-down rounded" style={{ maxHeight: '500px' }} 
        />
        <p className="p-4">{apodData.explanation}</p>
        <p className="mt-4">Copyright: {apodData.copyright}</p>
        <p className="mt-2">Date: {apodData.date}</p>
      </div>
    );
  }
}

export default Astropod;
