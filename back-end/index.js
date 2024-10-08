import express from 'express';
import { register,login,test } from './lib/auth.js';
import { deleteAccount } from './lib/manageAccount.js';
import { getLeaderboard, getGame, addWord } from './lib/game.js';
import cors from 'cors'
const app = express();
app.use(express.json());
app.use(cors());


//account management
app.post('/register', async (req, res) => {
  await register(req, res)
});

app.get('/test', async (req, res) => {
  await test(req, res)
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

app.get('/test', async (req, res) => {
    await test(req, res)
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
localhost:3000/register