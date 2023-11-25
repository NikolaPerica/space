import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Grid, Card, CardContent, Typography } from '@mui/material';

const cardStyles = {
  height: '100%',
  backgroundColor: 'rgba(0, 51, 102, 0.4)',
  boxShadow: 20,
  color: '#C0C0C0'
};

class NeoFeed extends Component {
  constructor() {
    super();
    this.state = {
      neoData: null,
      error: null,
      startDate: new Date(),
      endDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
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
    const apiUrl = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${formattedStartDate}&end_date=${formattedEndDate}&api_key=${apiKey}`;

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
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    this.setState({ startDate: date, endDate: nextDay, neoData: null }, this.fetchNeoData);
  };

  render() {
    const { neoData, error, startDate } = this.state;

    return (
      <div style={{ 
        padding: '50px',
        paddingTop: '15px',
        color: '#C0C0C0' }}>
        <h1 className="text-3xl font-bold flex items-center justify-center">Near Earth Object Feed</h1>
        <div className="flex items-center justify-center black">
          <DatePicker
          className="flex items-center justify-center black"
            selected={startDate}
            onChange={this.handleStartDateChange}
            dateFormat="dd/MM/yyyy"
            style={{ color: '#FFFFFF', margin: '50px' }}
          />
          
        </div>
        <p><br></br></p>
        {error ? (
          <p>Error: {error}</p>
        ) : neoData ? (
          <Grid container spacing={2}>
            {Object.keys(neoData.near_earth_objects).map((date) => (
              <React.Fragment key={date}>
                {neoData.near_earth_objects[date].map((neo) => (
                  <Grid item key={neo.id} xs={12} sm={6} md={4} lg={3}>
                    <Card elevated sx={{ boxShadow: 3 }} style={cardStyles}>
                      <CardContent>
                        <Typography variant="h5" component="div">
                          <strong>Name:</strong> {neo.name}
                        </Typography>
                        <Typography variant="h5" component="div">
                          <strong>Absolute Magnitude (H):</strong> {neo.absolute_magnitude_h}
                        </Typography>
                        <Typography variant="h5" component="div">
                          <strong>NASA JPL URL:</strong>{' '}
                          <a href={neo.nasa_jpl_url} target="_blank" rel="noopener noreferrer">
                            Visit JPL
                          </a>
                        </Typography>
                        <Typography variant="h5" component="div">
                          <strong>Estimated Diameter:</strong>{' '}
                          {`${neo.estimated_diameter.kilometers.estimated_diameter_min} - ${neo.estimated_diameter.kilometers.estimated_diameter_max} kilometers`}
                        </Typography>
                        <Typography variant="h5" component="div">
                          <strong>Is Potentially Hazardous Asteroid:</strong>{' '}
                          {neo.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}
                        </Typography>
                        <Typography variant="h5" component="div">
                          <strong>Close Approach Data</strong>
                        </Typography>
                        {neo.close_approach_data.map((approach, index) => (
                          <div key={index}>
                            <Typography variant="h6">
                              <strong>Close Approach Date and Time:</strong> {approach.close_approach_date_full}
                            </Typography>
                            <Typography variant="h6">
                              <strong>Relative Velocity:</strong> {`${approach.relative_velocity.kilometers_per_second} km/s`}
                            </Typography>
                            <Typography variant="h6">
                              <strong>Miss Distance:</strong> {`${approach.miss_distance.kilometers} kilometers`}
                            </Typography>
                            <Typography variant="h6">
                              <strong>Orbiting Body:</strong> {approach.orbiting_body}
                            </Typography>
                          </div>
                        ))}
                        <Typography variant="h5" component="div">
                          <strong>Is Sentry Object:</strong> {neo.is_sentry_object ? 'Yes' : 'No'}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </React.Fragment>
            ))}
          </Grid>
        ) : (
          <p>Loading NEO data...</p>
        )}
      </div>
    );
  }
}

export default NeoFeed;
