import { QRCodeRegex, EmailRegex, DateRegex, TimeRegex } from './regexs.js';

export const TOUR_TYPES = ['basico', 'premium', 'exclusivo'];

/** Checa se o QR Code está no formato esperado (QR + 3 dígitos). */
export function isValidQRCode(qrCode) {
    return typeof qrCode === 'string' && QRCodeRegex.test(qrCode);
}

export function isValidEmail(email) {
    return typeof email === 'string' && EmailRegex.test(email.trim());
}

/** Data no formato AAAA-MM-DD e que existe de verdade no calendário. */
export function isValidDate(date) {
    if (typeof date !== 'string' || !DateRegex.test(date)) return false;
    const d = new Date(`${date}T00:00:00Z`);
    return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === date;
}

export function isValidTime(time) {
    return typeof time === 'string' && TimeRegex.test(time);
}

/**
 * Valida os dados de uma reserva. Devolve a mensagem do primeiro erro ou null.
 * @param {object} r
 */
export function validateReservation(r) {
    if (!r || typeof r !== 'object') return 'Dados da reserva ausentes.';
    if (!Number.isInteger(Number(r.usuario_id)) || Number(r.usuario_id) <= 0) return 'Usuário inválido.';
    if (!r.nome_cliente || !String(r.nome_cliente).trim()) return 'Informe o nome do cliente.';
    if (!isValidEmail(r.email_cliente)) return 'E-mail do cliente inválido.';
    if (!r.telefone_cliente || !String(r.telefone_cliente).trim()) return 'Informe o telefone do cliente.';
    if (!isValidDate(r.data_visita)) return 'Data da visita inválida (use AAAA-MM-DD).';
    if (!isValidTime(r.horario_visita)) return 'Horário da visita inválido (use HH:MM).';
    const visitantes = Number(r.numero_visitantes);
    if (!Number.isInteger(visitantes) || visitantes < 1 || visitantes > 50) return 'Número de visitantes deve ser entre 1 e 50.';
    if (!TOUR_TYPES.includes(r.tipo_tour)) return `Tipo de tour inválido (use ${TOUR_TYPES.join(', ')}).`;
    return null;
}
