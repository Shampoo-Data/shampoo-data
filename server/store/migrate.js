const path = require('path');
const marv = require('marv/api/promise');
const driver = require('marv-pg-driver');

async function migrate() {
  const directory = path.resolve('server', 'store', 'migrations');
  const migrations = await marv.scan(directory);

  const connection = {
    connectionString: process.env.DATABASE_URL,
  };
  await marv.migrate(migrations, driver({ connection }));
}

module.exports = { migrate };
