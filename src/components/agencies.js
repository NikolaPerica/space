import React, { Component } from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import axios from 'axios';

class Agencies extends Component {
  constructor() {
    super();
    this.state = {
      agencies: [],
      currentPage: 1,  // Track the current page
      totalPages: 1,  // Track the total number of pages
      error: null,
      nextUrl: 'https://lldev.thespacedevs.com/2.2.0/agencies/',  // Initial URL
    };
  }

  componentDidMount() {
    this.fetchAgencies(1);
  }

  fetchAgencies = (page) => {
    axios
      .get(this.state.nextUrl)  // Use the nextUrl from the state
      .then((response) => {
        this.setState({
          agencies: response.data.results,
          totalPages: Math.ceil(response.data.count / 10),  // Calculate total pages
          currentPage: page,
          error: null,
          nextUrl: response.data.next,  // Update nextUrl for the next page
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
      <div>
        <h1 className="text-4xl flex justify-center items-center">
          <strong>List of Space Agencies</strong>
        </h1>
        {error ? (
          <p>Error: {error}</p>
        ) : (
          <ul className='pl-20'>
            {agencies.map((agency) => (
              <li key={agency.id}>
                <h2 className='text-2xl'>
                  <Link to={`/agency/${agency.id}`}>{/* Add Link to Agency Details */}
                    <strong>{agency.name}</strong>
                  </Link>
                </h2>
                {agency.logo_url ? (
                  <img src={agency.logo_url} alt={`${agency.name} Logo`} style={{ maxWidth: '300px' }} />
                ) : (
                  <p>No Logo</p>
                )}
              </li>
            ))}
          </ul>
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
