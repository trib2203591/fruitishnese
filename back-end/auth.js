import { client } from "./db.js";

export async function register(req, res) {
  const { username, password } = req.body;

  try {
    const userExists = await client.query('SELECT * FROM users WHERE username = $1', [username]);
    if (userExists.rowCount) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    await client.query("INSERT INTO users (username, password) VALUES ($1,$2)", [username, password]);
    return res.status(201).json({ message: 'user register successful' });
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
      return res.status(400).json({ message: "username don't exist" });
    }
    if(result.rows[0].password !== password){
      return res.status(400).json({message: "incorrect password"});
    }
    return res.status(200).json({message: "login successful"});

  }catch(error) {
    res.status(500).json(error)
  }
}

export async function test(req, res) {
  const { username, password } = req.body;
  try{
    const result = await client.query("select * from users where username = 'triminecraft'")
    return res.status(200).json(result.rows)
  }catch(error) {
    return res.status(500).json(error)
  }
}

