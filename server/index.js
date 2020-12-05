const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const { migrate } = require('./store/migrate');

const dev = process.env.NODE_ENV !== 'production';

const nextServer = next({ dev });
const nextRequestHandler = nextServer.getRequestHandler();

const port = process.env.PORT || '3000';

(async () => {
  await migrate();

  await nextServer.prepare();

  const server = createServer((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true);
    nextRequestHandler(req, res, parsedUrl);
  });
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`listening on :${port}...`);
  });
})();
