import { client } from "./db.js";


export async function getScore(req, res) {
    const { user_id } = req.body;
    try{
     const result = await client.query("select score from scores where user_id = $1", [user_id])
     return res.status(200).json(result.rows) 
    }catch(error) {
     res.status(500).json(error)
    }
 }
 
export async function updateScore(req, res) {
    try {
        const { user_id, score } = req.body;
        await client.query("UPDATE scores SET score = $1 WHERE user_id = $2", [score, user_id]);
        return res.status(200).json({ message: "score updated" });
    } catch (error) {
        res.status(500).json(error);
    }
}

export async function getLeaderboard(req, res) {
    try {
        const result = await client.query("select s.score, u.username, u.user_id from scores s join users u on s.user_id = u.user_id order by score desc limit 10");
        return res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json(error);
    }
}