import { execute } from './db.js';

export const RESERVATION_STATUS = ['pendente', 'confirmada', 'cancelada', 'concluida'];

/** Número máximo de visitantes por horário (configurável no .env). */
export const SLOT_CAPACITY = Number(process.env.VAGAS_POR_HORARIO) || 20;

export async function countVisitors(dataVisita, horarioVisita, ignoreId = null) {
    const [row] = await execute(
        `SELECT COALESCE(SUM(numero_visitantes), 0) AS total
           FROM reservas
          WHERE data_visita = ? AND horario_visita = ? AND status <> 'cancelada'
            AND (? IS NULL OR id <> ?)`,
        [dataVisita, horarioVisita, ignoreId, ignoreId]
    );
    return Number(row.total);
}

export async function checkAvailability(dataVisita, horarioVisita, ignoreId = null) {
    const ocupadas = await countVisitors(dataVisita, horarioVisita, ignoreId);
    const vagas_restantes = Math.max(SLOT_CAPACITY - ocupadas, 0);
    return { data: dataVisita, horario: horarioVisita, capacidade: SLOT_CAPACITY, vagas_restantes, disponivel: vagas_restantes > 0 };
}

export async function findReservationById(id) {
    const [reserva] = await execute('SELECT * FROM reservas WHERE id = ?', [id]);
    return reserva || null;
}

export async function findReservationsByUser(usuarioId) {
    return execute('SELECT * FROM reservas WHERE usuario_id = ? ORDER BY data_visita DESC, horario_visita DESC', [usuarioId]);
}

export async function createReservation(r) {
    const result = await execute(
        `INSERT INTO reservas
           (usuario_id, nome_cliente, email_cliente, telefone_cliente, data_visita, horario_visita, numero_visitantes, tipo_tour, observacoes)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [r.usuario_id, r.nome_cliente, r.email_cliente, r.telefone_cliente, r.data_visita, r.horario_visita,
         r.numero_visitantes, r.tipo_tour, r.observacoes || null]
    );
    return findReservationById(result.insertId);
}

export async function updateReservation(id, r) {
    await execute(
        `UPDATE reservas SET nome_cliente = ?, email_cliente = ?, telefone_cliente = ?, data_visita = ?,
                horario_visita = ?, numero_visitantes = ?, tipo_tour = ?, observacoes = ?
          WHERE id = ?`,
        [r.nome_cliente, r.email_cliente, r.telefone_cliente, r.data_visita, r.horario_visita,
         r.numero_visitantes, r.tipo_tour, r.observacoes || null, id]
    );
    return findReservationById(id);
}

export async function updateReservationStatus(id, status) {
    await execute('UPDATE reservas SET status = ? WHERE id = ?', [status, id]);
    return findReservationById(id);
}

export async function deleteReservation(id) {
    const result = await execute('DELETE FROM reservas WHERE id = ?', [id]);
    return result.affectedRows > 0;
}
