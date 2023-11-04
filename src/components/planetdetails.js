import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function PlanetDetails() {
  const { id } = useParams();
  const [planetData, setPlanetData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch agency details using the id
    axios
      .get(`https://api.le-systeme-solaire.net/rest/bodies/${id}`)
      .then((response) => {
        setPlanetData(response.data);
      })
      .catch((error) => {
        setError('Failed to fetch planet details');
      });
  }, [id]);

  return (
    <div className="p-4">
      {error ? (
        <p>Error: {error}</p>
      ) : planetData ? (
        <div>
          <h1 className="text-4xl flex justify-center items-center">
            <strong>{planetData.englishName} Details</strong>
          </h1>
          
          <h2 className="2xl" ><strong>{planetData.englishName}</strong></h2>
          <img className="max-w-lg object-scale-down rounded" style={{ maxHeight: '1000px' }}  src={`/solar/${id}.jpg`}></img>
                <p>Latin name: {planetData.name}</p>
                <p>Mean temperature: {planetData.avgTemp} K ({planetData.avgTemp-273.15} °C)</p>
                <p><strong>Moons</strong></p>
                {planetData.moons && planetData.moons.length > 0 ? (
                  <ol>
                    {planetData.moons.map((moon) => (
                      <li key={moon.rel}>
                        {moon.moon}
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p>No moons for this planet.</p>
                )}

        </div>
      ) : (
        <p>Loading planet details...</p>
      )}
    </div>
  );
}

export default PlanetDetails;
