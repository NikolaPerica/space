import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, Link } from '@mui/material';
import { spacing } from '@mui/system';

const cardStyles = {
  height: '100%',
  backgroundColor: 'rgba(0, 51, 102, 0.4)',
  boxShadow: 20,
  color: '#C0C0C0'
};

class Stations extends Component {
  constructor() {
    super();
    this.state = {
      stations: [],
      currentPage: 1,
      totalPages: 1,
      error: null,
      nextUrl: 'https://lldev.thespacedevs.com/2.2.0/spacestation/',
      previousUrl: null,
    };
  }

  componentDidMount() {
    this.fetchStations(1);
  }

  fetchStations = (page, previous = false) => {
    const url = previous ? this.state.previousUrl : this.state.nextUrl;

    axios
      .get(url)
      .then((response) => {
        this.setState({
          stations: response.data.results,
          totalPages: Math.ceil(response.data.count / 10),
          currentPage: page,
          error: null,
          nextUrl: response.data.next,
          previousUrl: response.data.previous,
        });
      })
      .catch((error) => {
        this.setState({ error: 'Failed to fetch launch data' });
      });
  }

  handlePageChange = (newPage, isNext) => {
    if (isNext) {
      this.fetchStations(newPage);
    } else {
      this.fetchStations(newPage, true);
    }
  }

  formatDate(dateString) {
    const [year, month, day] = dateString.split('-');
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  }

  render() {
    const { stations, error, currentPage, totalPages } = this.state;

    return (
      <div style={{ 
        padding: '50px',
        paddingTop: '15px',
        color: '#C0C0C0' }}>
        <h1 className="text-4xl flex justify-center items-center"><strong>List of Space Stations</strong></h1>
        <Grid container spacing={2}>
          {error ? (
            <p>Error: {error}</p>
          ) : (
            stations.map((station) => (
              <Grid item xs={12} sm={6} md={4} key={station.id}>
                <Card Card elevated sx={{ boxShadow: 3 }} style={cardStyles}>
                  <CardContent>
                    <Typography variant="h6"><strong>{station.name}</strong></Typography>
                    <Typography><strong>Status:</strong> {station.status.name}</Typography>
                    <Typography><strong>Orbit:</strong> {station.orbit}</Typography>
                    <Typography><strong>Founded:</strong> {this.formatDate(station.founded)}</Typography>
                    <Typography>{station.deorbited ? (<p><strong>Deorbited:</strong> {this.formatDate(station.deorbited)}</p>): <p><strong>Deorbited:</strong> Still in use</p>}</Typography>
                    {station.image_url ? (
                  <img src={station.image_url} alt={`${station.name} Logo`} style={{ maxWidth: '300px' }} />
                ) : (
                  <p>No Logo</p>
                )}
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
        
        
        {error && <p>Error: {error}</p>}
        <div>
          <p className="m-10">Page {currentPage} of {totalPages}</p>
          <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded m-10" onClick={() => this.handlePageChange(currentPage - 1, false)} disabled={currentPage === 1}>
            Previous Page
          </button>
          <button className="bg-blue-500 hover-bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={() => this.handlePageChange(currentPage + 1, true)} disabled={currentPage === totalPages}>
            Next Page
          </button>
        </div>
      </div>
    );
  }
}

export default Stations;
