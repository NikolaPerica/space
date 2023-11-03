import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function AgencyDetail() {
  const { id } = useParams();
  const [agencyData, setAgencyData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch agency details using the id
    axios
      .get(`https://lldev.thespacedevs.com/2.2.0/agencies/${id}`)
      .then((response) => {
        setAgencyData(response.data);
      })
      .catch((error) => {
        setError('Failed to fetch agency details');
      });
  }, [id]);

  return (
    <div>
      {error ? (
        <p>Error: {error}</p>
      ) : agencyData ? (
        <div>
          <h1 className="text-4xl flex justify-center items-center">
            <strong>Agency Details</strong>
          </h1>
          <h2 className="text-2xl">
            <strong>{agencyData.name}</strong>
          </h2>
          {agencyData.logo_url ? (
            <img
              src={agencyData.logo_url}
              alt={`${agencyData.name} Logo`}
              style={{ maxWidth: '300px' }}
            />
          ) : (
            <p>No Logo</p>
          )}
          {agencyData.image_url ? (
            <img
              src={agencyData.image_url}
              alt={`${agencyData.name} Logo`}
              style={{ maxWidth: '300px' }}
            />
          ) : (
            <p>No Image</p>
          )}
          <p>Country: {agencyData.country_code}</p>
          <p>Type: {agencyData.type}</p>
          <p>Description: {agencyData.description}</p>
          <p>Founded: {agencyData.founding_year}</p>
          {/* Display more agency details as needed */}
        </div>
      ) : (
        <p>Loading agency details...</p>
      )}
    </div>
  );
}

export default AgencyDetail;
