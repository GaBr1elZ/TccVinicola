import bcrypt from 'bcryptjs';
import { createUser, findUserByEmail, findUserById, updateUser } from '../models/userModels.js';
import { isValidEmail } from '../security/validation.js';

const MIN_PASSWORD = 6;

function parseId(value) {
    const id = Number(value);
    return Number.isInteger(id) && id > 0 ? id : null;
}

/**
 * Rotas de usuário: cadastro, login e perfil.
 * Respostas no formato { status: 'success' | 'error', data?, message? }, o mesmo que o app espera.
 * @param {import('fastify').FastifyInstance} fastify
 */
async function routesAuth(fastify) {

    fastify.post('/auth/register', async (request, reply) => {
        const { nome, email, senha, telefone } = request.body || {};

        if (!nome || !String(nome).trim()) {
            return reply.status(400).send({ status: 'error', message: 'Informe o nome.' });
        }
        if (!isValidEmail(email)) {
            return reply.status(400).send({ status: 'error', message: 'E-mail inválido.' });
        }
        if (typeof senha !== 'string' || senha.length < MIN_PASSWORD) {
            return reply.status(400).send({ status: 'error', message: `A senha deve ter no mínimo ${MIN_PASSWORD} caracteres.` });
        }

        const emailNormalizado = email.trim().toLowerCase();
        if (await findUserByEmail(emailNormalizado)) {
            return reply.status(409).send({ status: 'error', message: 'E-mail já cadastrado.' });
        }

        const senhaHash = await bcrypt.hash(senha, 10);
        const user = await createUser({ nome: String(nome).trim(), email: emailNormalizado, senhaHash, telefone });

        return reply.status(201).send({ status: 'success', message: 'Usuário cadastrado com sucesso.', data: user });
    });

    fastify.post('/auth/login', async (request, reply) => {
        const { email, senha } = request.body || {};

        if (!isValidEmail(email) || typeof senha !== 'string') {
            return reply.status(400).send({ status: 'error', message: 'Informe e-mail e senha.' });
        }

        const user = await findUserByEmail(email.trim().toLowerCase());
        const ok = user && (await bcrypt.compare(senha, user.senha));

        if (!ok) {
            return reply.status(401).send({ status: 'error', message: 'E-mail ou senha incorretos.' });
        }

        const { senha: _omit, ...publicUser } = user;
        return reply.send({ status: 'success', message: 'Login realizado com sucesso.', data: publicUser });
    });

    fastify.get('/auth/user/:id', async (request, reply) => {
        const id = parseId(request.params.id);
        const user = id && (await findUserById(id));

        if (!user) {
            return reply.status(404).send({ status: 'error', message: 'Usuário não encontrado.' });
        }
        return reply.send({ status: 'success', data: user });
    });

    fastify.put('/auth/user/:id', async (request, reply) => {
        const id = parseId(request.params.id);
        const { nome, telefone } = request.body || {};

        if (!id || !(await findUserById(id))) {
            return reply.status(404).send({ status: 'error', message: 'Usuário não encontrado.' });
        }
        if (!nome || !String(nome).trim()) {
            return reply.status(400).send({ status: 'error', message: 'Informe o nome.' });
        }

        const user = await updateUser(id, { nome: String(nome).trim(), telefone });
        return reply.send({ status: 'success', data: user });
    });
}

export default routesAuth;
