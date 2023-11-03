import React, { Component } from 'react';
import axios from 'axios';

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
      <div>
        <h1 className="text-4xl flex justify-center items-center"><strong>List of Mission patches</strong></h1>
        {error ? (
          <p>Error: {error}</p>
        ) : (
          <ul className='pl-20'>
            {patches.map((patch) => (
              <li key={patch.id}>
                <h2 className='text-2xl'><strong>Agency: {patch.agency.name}</strong></h2>
                <h2 className='text-2xl'><strong>Mission: {patch.name}</strong></h2>
                {patch.image_url ? (
                  <img src={patch.image_url} alt={`${patch.name} Logo`} style={{ maxWidth: '300px' }} />
                ) : (
                  <p>No Logo</p>
                )}
                <br></br>
              </li>
              
            ))}
          </ul>
       
        )}

        <div>
          <p className="m-10">Page {currentPage} of {totalPages}</p>
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
