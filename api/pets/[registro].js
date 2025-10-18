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

  const { registro } = req.query;

  try {
    switch (req.method) {
      case 'DELETE':
        // Excluir pet pelo registro
        const [result] = await pool.query('DELETE FROM pets WHERE registro = ?', [registro]);

        if (result.affectedRows === 0) {
          return res.status(404).json({ 
            success: false, 
            error: 'Pet não encontrado' 
          });
        }

        res.status(200).json({ 
          success: true, 
          message: 'Pet excluído com sucesso' 
        });
        break;

      default:
        res.setHeader('Allow', ['DELETE']);
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
