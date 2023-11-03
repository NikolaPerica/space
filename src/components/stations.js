import React, { Component } from 'react';
import axios from 'axios';

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
      <div>
        <h1 className="text-4xl flex justify-center items-center"><strong>List of Space Stations</strong></h1>
        
        {stations.length > 0 ? (
          <ul className='pl-20'>
            {stations.map((station) => (
              <li key={station.id}>
                <h2 className='text-2xl'><strong>{station.name}</strong></h2>
                <p>Status: {station.status.name}</p>
                <p>Orbit: {station.orbit}</p>
                <p>Founded: {this.formatDate(station.founded)}</p>
                {station.deorbited ? (<p>Deorbited: {this.formatDate(station.deorbited)}</p>): <p>Deorbited: Still in use</p>}
                
                {station.image_url ? (
                  <img src={station.image_url} alt={`${station.name} Logo`} style={{ maxWidth: '300px' }} />
                ) : (
                  <p>No Logo</p>
                )}
                
              </li>
            ))}
          </ul>
        ) : null}
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
