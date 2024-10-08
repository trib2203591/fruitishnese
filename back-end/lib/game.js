import { client } from "./db.js";

export async function getGame(req, res) {
    try {
        const question = await client.query("SELECT * FROM question_keys ORDER BY random() LIMIT 1;")
        const key_id = question.rows[0].key_id

        const Answer = await client.query("SELECT * FROM keys_vn where key_id = $1;", [key_id]) 
        
        const Options = await client.query("SELECT * FROM keys_vn where key_id != $1 ORDER BY random() LIMIT 3;", [key_id])
        
        const shuffleArray = (array) => {
          for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; 
          }
          return array;
        };
        
        
        Options.rows.push(Answer.rows[0])
        const OptionsShuffled = shuffleArray([...Options.rows]);
        
        const questionObject = {
            question_id: question.rows[0].question_id,
            word: question.rows[0].word,
            key_id: question.rows[0].key_id
        };
        
        const optionsObject = OptionsShuffled.map(row => ({
            key_id: row.key_id,
            key: row.key
        }));

        return res.status(200).json({
            question: questionObject,
            options: optionsObject
        });
    } catch (error) {
        res.status(500).json(error);
    }
}

export async function addWord(req, res) {
    const { word, key } = req.body;
    try {
        const result = await client.query("SELECT * FROM question_keys where lower(word) = lower($1)", [word])
        if (!result.rowCount) {
            const result = await client.query("INSERT INTO keys_vn (key) VALUES (upper(substr($1,1,1)) || substr($1,2)) RETURNING key_id", [key])
            const id = result.rows[0].key_id
            await client.query("INSERT INTO question_keys (word, key_id) VALUES (upper(substr($1,1,1)) || substr($1,2), $2)", [word, id])
            return res.status(201).json({ message: "word added" });
        }
        return res.status(400).json({ message: "word already exist" });
    } catch (error) {
        res.status(500).json(error);
    }
}
