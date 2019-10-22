const handler = require('serve-handler');
const http = require('http');
 
const server = http.createServer((request, response) => {
  return handler(request, response, {
    public: './element-ui',
    directoryListing: false
  });
})

const port = process.env.PORT || 3000
const ip = process.env.IP || 'localhost'
server.listen(port,ip, () => {
  console.log(`Running at http://${ip}:${port}`);
});