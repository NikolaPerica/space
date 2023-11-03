const http = require('http');
const httpProxy = require('http-proxy');

// Define the FlightAware AeroAPI base URL
const aeroApiBaseUrl = 'https://aeroapi.flightaware.com/aeroapi';

const proxy = httpProxy.createProxyServer({});
const server = http.createServer((req, res) => {
  // Extract the path from the incoming request
  const requestPath = req.url;

  // Construct the target URL by combining the base URL and the request path
  const target = `${aeroApiBaseUrl}${requestPath}`;

  // Proxy the request to the target AeroAPI endpoint
  proxy.web(req, res, { target });
});

server.listen(3001, () => {
  console.log('Proxy server is running on port 3001');
});
