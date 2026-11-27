import db from '../config/db.js';

/**
 * Executa uma consulta SQL com parâmetros e devolve as linhas (ou o resultado do INSERT/UPDATE).
 * @param {string} query
 * @param {Array} [params=[]]
 */
export async function execute(query, params = []) {
    const [rows] = await db.query(query, params);
    return rows;
}
