const oracledb = require('oracledb');
const dbConfig = require('../../dbconfig.js');

const poolSymbol = Symbol.for('oracle.pool');

process.env.ORA_SDTZ = process.env.ORA_SDTZ || 'America/Sao_Paulo'; // horário de Brasília

async function initPool() {
  if (global[poolSymbol]) return global[poolSymbol];

  const config = {
    user: dbConfig.user,
    password: dbConfig.password,
    connectString: dbConfig.connectString,
    poolMin: 1,
    poolMax: 5,
    poolIncrement: 1
  };

  const pool = await oracledb.createPool(config);
  global[poolSymbol] = pool;
  return pool;
}

async function getConnection() {
  const pool = await initPool();
  return pool.getConnection();
}

module.exports = { initPool, getConnection };
