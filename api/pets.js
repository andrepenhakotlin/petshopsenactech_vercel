import mysql from 'mysql2/promise';

// Configuração do banco de dados usando variáveis de ambiente
const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'pet_register',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    switch (req.method) {
      case 'GET':
        // Buscar todos os pets
        const [rows] = await pool.query('SELECT * FROM pet_register');
        res.status(200).json(rows);
        break;

      case 'POST':
        // Criar novo pet
        const { registro, nome, tipo, idade } = req.body;

        if (!registro || !nome || !tipo || !idade) {
          return res.status(400).json({ 
            success: false, 
            error: 'Campos obrigatórios faltando' 
          });
        }

        const [result] = await pool.query(
          'INSERT INTO pets (registro, nome, tipo, idade) VALUES (?, ?, ?, ?)',
          [registro, nome, tipo, idade]
        );

        res.status(201).json({ 
          success: true, 
          insertId: result.insertId 
        });
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Método ${req.method} não permitido`);
    }
  } catch (error) {
    console.error('Erro na API:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Erro interno do servidor' 
    });
  }
}
