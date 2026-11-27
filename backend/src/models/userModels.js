import { execute } from './db.js';

const PUBLIC_FIELDS = 'id, nome, email, telefone, criado_em';

export async function findUserByEmail(email) {
    const [user] = await execute('SELECT * FROM usuarios WHERE email = ?', [email]);
    return user || null;
}

export async function findUserById(id) {
    const [user] = await execute(`SELECT ${PUBLIC_FIELDS} FROM usuarios WHERE id = ?`, [id]);
    return user || null;
}

export async function createUser({ nome, email, senhaHash, telefone }) {
    const result = await execute(
        'INSERT INTO usuarios (nome, email, senha, telefone) VALUES (?, ?, ?, ?)',
        [nome, email, senhaHash, telefone || null]
    );
    return findUserById(result.insertId);
}

export async function updateUser(id, { nome, telefone }) {
    await execute('UPDATE usuarios SET nome = ?, telefone = ? WHERE id = ?', [nome, telefone || null, id]);
    return findUserById(id);
}
