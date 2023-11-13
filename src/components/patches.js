import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography } from '@mui/material';

const cardStyles = {
  height: '100%',
  backgroundColor: 'rgba(0, 51, 102, 0.4)',
  boxShadow: 20
};

class Patches extends Component {
  
  constructor() {
    super();
    this.state = {
      patches: [],
      currentPage: 1,
      totalPages: 1,
      error: null,
      nextUrl: 'https://lldev.thespacedevs.com/2.2.0/mission_patch/',
      previousUrl: null,
    };
  }

  componentDidMount() {
    this.fetchPatches(1);
  }

  fetchPatches = (page) => {
    let url = this.state.nextUrl; // Default to nextUrl

    if (page < this.state.currentPage) {
      // If we're going back, use the previousUrl
      url = this.state.previousUrl;
    }

    axios
      .get(url)
      .then((response) => {
        this.setState({
          patches: response.data.results,
          totalPages: Math.ceil(response.data.count / 10),
          currentPage: page,
          error: null,
          nextUrl: response.data.next,
          previousUrl: response.data.previous,
        });
      })
      .catch((error) => {
        this.setState({ error: 'Failed to fetch patches data' });
      });
  }

  handlePageChange = (newPage) => {
    this.fetchPatches(newPage);
  }

  render() {
    const { patches, error, currentPage, totalPages } = this.state;

    return (
      <div style={{ 
        /* backgroundImage: `url("https://news.mit.edu/sites/default/files/images/202306/MIT-3q-FirstLight-01-press.jpg")`, 
        backgroundColor: '#0b3d91',        */
        padding: '50px',
        paddingTop: '15px'
      }}>
        <h1 className="text-4xl flex justify-center items-center mb-10 pb-20" style={{color: '#C0C0C0'}}><strong>List of Mission patches</strong></h1>
        {error ? (
          <p>Error: {error}</p>
        ) : (
          <Grid container spacing={2}>
          {patches.map((patch) => (
            <Grid item key={patch.id} xs={12} sm={6} md={4} lg={3}>
              <Card elevated sx={{ boxShadow: 3 }} style={cardStyles}>
                <CardContent>
                  <Typography variant="h5" component="div" style={{color: '#C0C0C0'}}>
                    <strong>Agency: {patch.agency.name}</strong>
                  </Typography>
                  <Typography variant="h5" component="div" style={{color: '#C0C0C0'}}>
                    <strong>Mission: {patch.name}</strong>
                  </Typography>
                  {patch.image_url ? (
                    <img
                      src={patch.image_url}
                      alt={`${patch.name} Logo`}
                      style={{ maxWidth: '100%' }}
                    />
                  ) : (
                    <p style={{color: '#C0C0C0'}}>No Logo</p>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
       
        )}

        <div>
          <p className="m-10" style={{color: '#C0C0C0'}}>Page {currentPage} of {totalPages}</p>
          <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded m-10" onClick={() => this.handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            Previous Page
          </button>
          <button className="bg-blue-500 hover-bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={() => this.handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            Next Page
          </button>
        </div>
      </div>
    );
  }
}

export default Patches;
