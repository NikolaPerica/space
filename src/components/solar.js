import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Solar extends Component {
  constructor() {
    super();
    this.state = {
      planets: [],
      error: null,
    };
  }

  componentDidMount() {
    axios
      .get('https://api.le-systeme-solaire.net/rest/bodies?filter[]=isPlanet,eq,true&order=aphelion,asc')
      .then((response) => {
        this.setState({ planets: response.data.bodies });
      })
      .catch((error) => {
        this.setState({ error: 'Failed to fetch solar system data' });
      });
  }

  render() {
    const { planets, error } = this.state;

    return (
      <div className="grid h-screen place-items-center" style={{padding: '25px'}}>

      <h1 className="text-3xl flex justify-center items-center"><strong>Planets and Their Moons</strong></h1>

      {/* Image Map Generated by http://www.image-map.net/ */}
      <img src="https://media.hswstatic.com/eyJidWNrZXQiOiJjb250ZW50Lmhzd3N0YXRpYy5jb20iLCJrZXkiOiJnaWZcL3BsYW5ldC1vcmRlci5qcGciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjgyOH19fQ==" usemap="#image-map"></img>

      <map name="image-map">
          <area target="" alt="Mercury" title="Mercury" href="/planet/mercure" coords="186,216,19" shape="circle"></area>
          <area target="" alt="Venus" title="Venus" href="/planet/venus" coords="222,216,18" shape="circle"></area>
          <area target="" alt="Earth" title="Earth" href="/planet/terre" coords="273,217,26" shape="circle"></area>
          <area target="" alt="Mars" title="Mars" href="/planet/mars" coords="319,217,21" shape="circle"></area>
          <area target="" alt="Jupiter" title="Jupiter" href="/planet/jupiter" coords="405,216,51" shape="circle"></area>
          <area target="" alt="Saturn" title="Saturn" href="/planet/saturne" coords="561,217,62" shape="circle"></area>
          <area target="" alt="Uranus" title="Uranus" href="/planet/uranus" coords="658,217,31" shape="circle"></area>
          <area target="" alt="Neptune" title="Neptune" href="/planet/neptune" coords="724,219,25" shape="circle"></area>
          <area target="" alt="Sun" title="Sun" href="/planet/soleil" coords="111,296,94,411,74,464,1,465,2,0,37,4,90,90,107,172" shape="poly"></area>
      </map>
        <br></br>
        {error ? (
          <p>Error: {error}</p>
        ) : planets.length > 0 ? (
          <ul>
            {planets.map((planet) => (
              <li key={planet.id}>

                <h2 className="2xl" ><strong>{planet.englishName}</strong></h2>
                <p>Latin name: {planet.name}</p>
                <p>Mean temperature: {planet.avgTemp} K ({planet.avgTemp-273.15} °C)</p>
                <p><strong>Moons</strong></p>
                {planet.moons && planet.moons.length > 0 ? (
                  <ol>
                    {planet.moons.map((moon) => (
                      <li key={moon.rel}>
                        {moon.moon}
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p>No moons for this planet.</p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No planets data available.</p>
        )}
      </div>
    );
  }
}

export default Solar;
