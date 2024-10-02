const { QuestionKey, KeyVN, Score, User, sequelize } = require('./db');

async function getQuestion(req, res) {
  const question = await QuestionKey.findOne({ order: sequelize.random() });
  const allKeys = await KeyVN.findAll({ limit: 4 });

  const choices = allKeys.map(key => key.key);
  res.json({ word: question.word, choices });
}

async function updateScore(req, res) {
  const { userId } = req.user;
  const { correct } = req.body;

  const userScore = await Score.findOne({ where: { user_id: userId } });

  userScore.score += correct ? 1 : -1;
  await userScore.save();

  res.json({ score: userScore.score });
}

async function getLeaderboard(req, res) {
  const scores = await Score.findAll({
    order: [['score', 'DESC']],
    limit: 10,
    include: [User]
  });

  res.json(scores);
}

module.exports = { getQuestion, updateScore, getLeaderboard };
