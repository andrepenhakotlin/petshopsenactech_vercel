import express from 'express';
import db from '../db/mysql.js';

export default (app) => {
  const router = express.Router();

  // GET /pets
  router.get('/pets', async (req, res) => {
    try {
      const [rows] = await db.query('SELECT * FROM pets');
      res.json(rows);
    } catch (err) {
      console.error('Erro ao buscar pets:', err);
      res.status(500).json({ error: 'Erro ao buscar pets' });
    }
  });

  app.use('/api', router);
};
