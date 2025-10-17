// api/db.js
const { createClient } = require('@supabase/supabase-js');

// const supabase = createClient(
//   process.env.SUPABASE_URL,
//   process.env.SUPABASE_KEY
// );

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end(); // Preflight
  }

  if (req.method === 'GET') {
    const { data, error } = await supabase.from('usuarios').select('*');
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  if (req.method === 'POST') {
    const body = req.body;

    const { data, error } = await supabase.from('usuarios').insert([body]);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(201).json({ message: 'Usuário inserido com sucesso', data });
  }

  return res.status(405).json({ error: 'Method not allowed' });
};

// Exemplo de consulta
async function fetchData() {
  const { data, error } = await supabase
    .from('pets') // nome da tabela
    .select('*');

  if (error) {
    console.error('Erro ao buscar dados:', error);
    return;
  }

  console.log('Dados recuperados:', data);
}

fetchData();