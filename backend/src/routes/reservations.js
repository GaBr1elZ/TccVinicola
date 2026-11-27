import {
    RESERVATION_STATUS, checkAvailability, createReservation, deleteReservation, findReservationById,
    findReservationsByUser, updateReservation, updateReservationStatus,
} from '../models/reservationModels.js';
import { findUserById } from '../models/userModels.js';
import { isValidDate, isValidTime, validateReservation } from '../security/validation.js';

function parseId(value) {
    const id = Number(value);
    return Number.isInteger(id) && id > 0 ? id : null;
}

/** Data de hoje (AAAA-MM-DD) no fuso de São Paulo, para não aceitar reservas no passado. */
function today() {
    return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo' }).format(new Date());
}

/**
 * Normaliza e valida o corpo de uma reserva. Devolve { data } ou { error }.
 */
async function parseReservation(body, ignoreId = null) {
    const r = { ...(body || {}) };
    r.numero_visitantes = Number(r.numero_visitantes ?? 1);

    const error = validateReservation(r);
    if (error) return { error, code: 400 };

    if (r.data_visita < today()) return { error: 'A data da visita já passou.', code: 400 };

    if (!(await findUserById(Number(r.usuario_id)))) return { error: 'Usuário não encontrado.', code: 404 };

    const vaga = await checkAvailability(r.data_visita, r.horario_visita, ignoreId);
    if (r.numero_visitantes > vaga.vagas_restantes) {
        return { error: `Horário sem vagas suficientes (restam ${vaga.vagas_restantes}).`, code: 409 };
    }

    return { data: r };
}

/**
 * Rotas de reservas de visitas.
 * @param {import('fastify').FastifyInstance} fastify
 */
async function routesReservations(fastify) {

    fastify.post('/reservations', async (request, reply) => {
        const { data, error, code } = await parseReservation(request.body);
        if (error) return reply.status(code).send({ status: 'error', message: error });

        const reserva = await createReservation(data);
        return reply.status(201).send({ status: 'success', message: 'Reserva criada com sucesso.', data: reserva });
    });

    // Declarada antes de /reservations/:id para não ser confundida com um id
    fastify.get('/reservations/check-availability/:data/:horario', async (request, reply) => {
        const { data, horario } = request.params;
        if (!isValidDate(data) || !isValidTime(horario)) {
            return reply.status(400).send({ status: 'error', message: 'Use data AAAA-MM-DD e horário HH:MM.' });
        }
        return reply.send({ status: 'success', data: await checkAvailability(data, horario) });
    });

    fastify.get('/reservations/user/:usuarioId', async (request, reply) => {
        const id = parseId(request.params.usuarioId);
        if (!id) return reply.status(400).send({ status: 'error', message: 'Usuário inválido.' });
        return reply.send({ status: 'success', data: await findReservationsByUser(id) });
    });

    fastify.get('/reservations/:id', async (request, reply) => {
        const id = parseId(request.params.id);
        const reserva = id && (await findReservationById(id));
        if (!reserva) return reply.status(404).send({ status: 'error', message: 'Reserva não encontrada.' });
        return reply.send({ status: 'success', data: reserva });
    });

    fastify.put('/reservations/:id', async (request, reply) => {
        const id = parseId(request.params.id);
        const atual = id && (await findReservationById(id));
        if (!atual) return reply.status(404).send({ status: 'error', message: 'Reserva não encontrada.' });

        const { data, error, code } = await parseReservation({ ...atual, ...request.body, usuario_id: atual.usuario_id }, id);
        if (error) return reply.status(code).send({ status: 'error', message: error });

        return reply.send({ status: 'success', data: await updateReservation(id, data) });
    });

    fastify.patch('/reservations/:id/status', async (request, reply) => {
        const id = parseId(request.params.id);
        const { status } = request.body || {};
        if (!RESERVATION_STATUS.includes(status)) {
            return reply.status(400).send({ status: 'error', message: `Status inválido (use ${RESERVATION_STATUS.join(', ')}).` });
        }
        if (!id || !(await findReservationById(id))) {
            return reply.status(404).send({ status: 'error', message: 'Reserva não encontrada.' });
        }
        return reply.send({ status: 'success', data: await updateReservationStatus(id, status) });
    });

    fastify.delete('/reservations/:id', async (request, reply) => {
        const id = parseId(request.params.id);
        if (!id || !(await deleteReservation(id))) {
            return reply.status(404).send({ status: 'error', message: 'Reserva não encontrada.' });
        }
        return reply.send({ status: 'success', message: 'Reserva removida.' });
    });
}

export default routesReservations;
