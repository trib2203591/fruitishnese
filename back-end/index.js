import express from 'express';
import { register,login } from './lib/auth.js';
import { deleteAccount } from './lib/manageAccount.js';
import { getGame, addWord } from './lib/game.js';
import { getLeaderboard, updateScore, getScore } from './lib/manageScore.js';
import cors from 'cors'
const app = express();
app.use(express.json());
app.use(cors());


//account management
app.post('/register', async (req, res) => {
  await register(req, res)
});

app.post('/login', async (req, res) => {
  await login(req, res)
});

app.delete('/delete', async (req, res) => {
  await deleteAccount(req, res)
});


//game functions
app.get('/leaderboard', async (req, res) => {
    await getLeaderboard(req, res)
});

app.get('/game', async (req, res) => {
    await getGame(req, res)
});

app.post('/word', async (req, res) => {
    await addWord(req, res)
});

app.post('/get-score', async (req, res) => {
    await getScore(req, res)
});

app.post('/update-score', async (req, res) => {
    await updateScore(req, res)
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
localhost:3000/register