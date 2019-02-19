const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = {
  client: 'sqlite3',
  connection: {
    filename: './data/lambda.sqlite3',
  },
  useNullAsDefault: true, // needed for sqlite
};
const db = knex(knexConfig);


const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

// list all zoos
server.get('/api/zoos', async (req, res) => {
  // get the zoos from the database
  try {
    const zoos = await db('zoos'); // all the records from the table
    res.status(200).json(zoos);
  } catch (error) {
    res.status(500).json(error);
  }
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
