import express from 'express';
import { register,login, test } from './auth.js';
import cors from 'cors'
const app = express();
app.use(express.json());
app.use(cors());


app.post('/register', async (req, res) => {
  await register(req, res)
});

app.post('/login', async (req, res) => {
    await login(req, res)
});

app.get('/test', async (req, res) => {
    await test(req, res)
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
localhost:3000/register