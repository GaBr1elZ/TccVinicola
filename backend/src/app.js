import fastify from 'fastify';
import cors from '@fastify/cors';
import routesQR from './routes/routes.js';
import routesAuth from './routes/auth.js';
import routesReservations from './routes/reservations.js';

const app = fastify({ logger: true });

// Libera o acesso do app (Expo web e celular) de qualquer origem
app.register(cors, { origin: true });

// Aceita corpo vazio com Content-Type JSON (o app manda esse cabeçalho até no DELETE)
app.removeContentTypeParser('application/json');
app.addContentTypeParser('application/json', { parseAs: 'string' }, (request, body, done) => {
    if (!body || !body.trim()) return done(null, {});
    try {
        done(null, JSON.parse(body));
    } catch {
        const err = new Error('JSON inválido no corpo da requisição.');
        err.statusCode = 400;
        done(err);
    }
});

// Health check simples, útil no Railway e no Docker
app.get('/', async () => ({ status: 'success', message: 'API da Vinícola no ar' }));

app.register(routesQR);
app.register(routesAuth);
app.register(routesReservations);

// Erros inesperados saem no mesmo formato das outras respostas, sem detalhes internos
app.setErrorHandler((error, request, reply) => {
    request.log.error(error);
    const code = error.statusCode && error.statusCode < 500 ? error.statusCode : 500;
    reply.status(code).send({ status: 'error', message: code === 500 ? 'Erro interno no servidor.' : error.message });
});

app.setNotFoundHandler((request, reply) => {
    reply.status(404).send({ status: 'error', message: `Rota ${request.method} ${request.url} não encontrada.` });
});

export default app;
