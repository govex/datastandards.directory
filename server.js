// Use the environment variable or use a given port
const PORT = process.env.PORT || 8080;

// Create a server, uses `handleRequest` which is function that takes
// care of providing requested data
const server = http.createServer(handleRequest);

// Start the server
server.listen(PORT, () => {
  console.log('Server listening on: http://localhost:%s', PORT, '/index');
});