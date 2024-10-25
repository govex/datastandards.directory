// use either the environment variable or use a given port
const PORT = process.env.PORT || 8080;

// create a server. `handleRequest` is a function for providing requested data
//const server = http.createServer(handleRequest);

const server = createServer((handleRequest, res) => {
  res.statusCode = 200;
});

// start server
server.listen(PORT, () => {
  console.log('Server listening');
});
