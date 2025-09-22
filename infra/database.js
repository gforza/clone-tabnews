// Importa o "motor" para se conectar com o banco de dados PostgreSQL.
import { Client } from "pg";

// Cria uma função chamada "query" que sabe como executar comandos no banco.
async function query(queryObject) {
  // Cria um novo cliente de banco de dados com as credenciais de acesso.
  // Essas credenciais (host, porta, usuário, etc.) são pegas de "variáveis de ambiente" (process.env).
  // Isso é uma boa prática para não deixar senhas e dados sensíveis expostos no código.
  const client = new Client({
    host: process.env.POSTGRES_LOCALHOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });

  // Conecta-se de fato ao banco de dados.
  await client.connect();

  // Executa o comando SQL que foi passado para a função (queryObject).
  const result = await client.query(queryObject);

  // Fecha a conexão com o banco de dados para liberar recursos.
  await client.end();

  // Retorna o resultado do comando.
  return result;
}

// Exporta a função "query" para que outros arquivos (como o index.js) possam usá-la.
export default {
  query: query,
};
