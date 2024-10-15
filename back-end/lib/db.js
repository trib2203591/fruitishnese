import pg from 'pg'
import dotenv from 'dotenv';

dotenv.config()

const user = process.env.USER;
const password = process.env.PASSWORD;
const host = process.env.HOST;
const port = process.env.PORT;
const database = process.env.DATABASE;
const { Client } = pg


const client = new Client({
  user: user,
  password: password,
  host: host,
  port: port,
  database: database,
});

await client.connect();

export {client};

 
