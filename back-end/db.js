import pg from 'pg'
const { Client } = pg
const { Pool } = pg
 
const client = new Client({
  user: 'postgres',
  password: '123',
  host: 'localhost',
  port: 5432,
  database: 'english_app',
});

await client.connect();
/* const result = await client.query("select * from users where username = 'triminecraft'")
if(!result.rowCount) {
  console.log("khong ton tai")
}
else {
  console.log(result.rows[0].password)
}
client.end() */
export {client};
/* await client.query("INSERT INTO users (username, password) VALUES ('nonolo', '12')");
const result = await client.query('SELECT * FROM users');
console.log(result.rows) */
 
