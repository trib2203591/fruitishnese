
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



 const question = await client.query("SELECT * FROM question_keys ORDER BY random() LIMIT 1;")
console.log(question.rows[0]) 
const key_id = question.rows[0].key_id
const Answer = await client.query("SELECT * FROM keys_vn where key_id = $1;", [key_id]) 

const Options = await client.query("SELECT * FROM keys_vn where key_id != $1 ORDER BY random() LIMIT 3;", [key_id])


Options.rows.push(Answer.rows[0])

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; 
  }
  return array;
};




const OptionsShuffled = shuffleArray([...Options.rows])

const OptionsJson = OptionsShuffled.map(row => ({
  key_id: row.key_id,
  key: row.key
}));
OptionsJson.push(question.rows[0])
console.log(OptionsJson);


await client.end()
 
