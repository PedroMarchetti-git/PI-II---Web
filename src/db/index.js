const mysql = require('mysql2/promise');
const dbConfig = require('../../dbconfig.js');

const poolSymbol = Symbol.for('mysql.pool');

async function initPool() {
  if (global[poolSymbol]) return global[poolSymbol];

  // Cria o pool com as configs centralizadas no dbConfig
  const pool = mysql.createPool(dbConfig);
  global[poolSymbol] = pool;

  return pool;
}

async function getConnection() {
  const pool = await initPool();
  return pool.getConnection();
}

module.exports = { initPool, getConnection };
