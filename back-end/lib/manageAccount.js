import { client } from "./db.js";

async function changePassword(req, res) {
    const { username, password } = req.body;
  
    try {
      const user = await client.query('SELECT * FROM users WHERE username = $1', [username]);
      if (user.password === password) {
        return res.status(400).json({ message: 'Password unchanged!!' });
      }
      await client.query('ALTER TABLE users SET password = $2 WHERE username = $1', [password,username]);
      return res.status(201).json({ message: 'Password changed successfully!!' });
    } catch (error) {
      res.status(500).json(error);
    }
}

export async function deleteAccount(req, res) {
    const { username, password } = req.body;
    try{
      const result = await client.query("select * from users where username = $1", [username])
      if(result.rows[0].password !== password){
        return res.status(400).json({message: "incorrect password"});
      }
      await client.query("DELETE FROM users WHERE username = $1", [username])
      return res.status(200).json({message: "account deleted"});
  
    }catch(error) {
      res.status(500).json(error)
    }
}     
