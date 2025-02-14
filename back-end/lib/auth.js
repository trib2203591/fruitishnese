import { client } from "./db.js";

export async function register(req, res) {
  const { username, password } = req.body;

  try {
    const userExists = await client.query('SELECT * FROM users WHERE username = $1', [username]);
    if (userExists.rowCount) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    const result = await client.query("INSERT INTO users (username, password) VALUES ($1,$2) RETURNING user_id", [username, password]);
    await client.query("INSERT INTO scores (user_id, score) VALUES ($1,$2)", [result.rows[0].user_id, 0]);
    return res.status(201).json({ message: 'user register successful', user_id: result.rows[0].user_id });
  } catch (error) {
    res.status(500).json(error);
  }
}

// User Login
export async function login(req, res) {
  const { username, password } = req.body;
  try{
    const result = await client.query("select * from users where username = $1", [username])
    if(!result.rowCount) {
      return res.status(400).json({ message: "user don't exist" });
    }
    if(result.rows[0].password !== password){
      return res.status(400).json({message: "incorrect password"});
    }
    return res.status(200).json({message: "login successful", user_id: result.rows[0].user_id});

  }catch(error) {
    res.status(500).json(error)
  }
}


