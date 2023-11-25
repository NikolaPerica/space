import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Grid, Card, CardContent, Typography } from '@mui/material';

const cardStyles = {
  height: '100%',
  backgroundColor: 'rgba(0, 51, 102, 0.4)',
  boxShadow: 20,
  color: '#C0C0C0'
};

class Agencies extends Component {
  constructor() {
    super();
    this.state = {
      agencies: [],
      currentPage: 1,
      totalPages: 1,
      error: null,
      nextUrl: 'https://lldev.thespacedevs.com/2.2.0/agencies/',
    };
  }

  componentDidMount() {
    this.fetchAgencies(1);
  }

  fetchAgencies = (page) => {
    axios
      .get(this.state.nextUrl)
      .then((response) => {
        this.setState({
          agencies: response.data.results,
          totalPages: Math.ceil(response.data.count / 10),
          currentPage: page,
          error: null,
          nextUrl: response.data.next,
        });
      })
      .catch((error) => {
        this.setState({ error: 'Failed to fetch launch data' });
      });
  }

  handlePageChange = (newPage) => {
    this.fetchAgencies(newPage);
  }

  render() {
    const { agencies, error, currentPage, totalPages } = this.state;

    return (
      <div style={{ 
        padding: '50px',
        paddingTop: '15px',
        color: '#C0C0C0' }}>
        <h1 className="text-4xl flex justify-center items-center">
          <strong>List of Space Agencies</strong>
        </h1>
        {error ? (
          <p>Error: {error}</p>
        ) : (
          <Grid container spacing={2}>
            {agencies.map((agency) => (
              <Grid item key={agency.id} xs={12} sm={6} md={4} lg={3}>
                <Card Card elevated sx={{ boxShadow: 3 }} style={cardStyles}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      <Link to={`/agency/${agency.id}`}>
                        <strong>{agency.name}</strong>
                      </Link>
                    </Typography>
                    {agency.logo_url ? (
                      <img src={agency.logo_url} alt={`${agency.name} Logo`} style={{ maxWidth: '100%' }} />
                    ) : (
                      <p>No Logo</p>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        <div>
          <p className="m-10">Page {currentPage} of {totalPages}</p>
          <button className="bg-blue-500 hover-bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded m-10" onClick={() => this.handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
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

export default Agencies;
