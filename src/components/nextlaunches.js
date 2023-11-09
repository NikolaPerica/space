import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, Link } from '@mui/material';
import { spacing } from '@mui/system';



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
      <div >
        <h1 className="text-4xl flex justify-center items-center"><strong>Next 5 Rocket Launches</strong></h1>
        <Grid container spacing={2}>
          {error ? (
            <p>Error: {error}</p>
          ) : (
            launches.map((launch) => (
              <Grid item xs={12} sm={6} md={4} key={launch.id}>
                <Card sx={{ml: 5, mt: 5}} variant='outlined'>
                  <CardContent>
                    <Typography variant="h6"><strong>{launch.name}</strong></Typography>
                    <Typography><strong>Provider:</strong> {launch.provider.name}</Typography>
                    <Typography><strong>Vehicle:</strong> {launch.vehicle.name}</Typography>
                    <Typography><strong>Launch Description:</strong> {launch.launch_description}</Typography>
                    <Typography><strong>Launch Date:</strong> {launch.date_str}</Typography>
                    <Typography><strong>Location: </strong>{launch.pad.location.name}, {launch.pad.location.country}</Typography>
                    <Typography><strong>Detail: </strong>{launch.quicktext}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </div>
    );
  
  
  }
}

export default NextLaunches;
