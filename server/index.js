const express = require('express');
const bodyParser = require('body-parser');
const next = require('next');

const { migrate } = require('./store/migrate');
const insertShampoo = require('./store/insertShampoo');

const dev = process.env.NODE_ENV !== 'production';
const nextServer = next({ dev });
const nextRequestHandler = nextServer.getRequestHandler();

const port = process.env.PORT || '3000';

(async () => {
  try {
    await migrate();

    await nextServer.prepare();

    const server = express();
    server.use(bodyParser.json());

    server.post('/api/shampoos', async (req, res) => {
      try {
        const { body } = req;
        console.log(body);
        await insertShampoo(body);
        res.json({ message: 'you hit the post endpont' });
      } catch (error) {
        res.status = 500;
        res.json({ error: error.message, stack: error.stack });
      }
    });

    server.get('*', nextRequestHandler);

    // const server = createServer((req, res) => {
    //   // Be sure to pass `true` as the second argument to `url.parse`.
    //   // This tells it to parse the query portion of the URL.
    //   const parsedUrl = parse(req.url, true);
    //   nextRequestHandler(req, res, parsedUrl);
    // });
    // server.listen(port, (err) => {
    //   if (err) throw err;
    //   console.log(`listening on :${port}...`);
    // });

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`listening on :${port}...`);
    });
  } catch (e) {
    console.log(`error starting up`);
    console.log(e);
    process.exit(1);
  }
})();
