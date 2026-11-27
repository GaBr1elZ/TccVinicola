import { getItemsByQRCode } from '../models/itemModels.js';
import { isValidQRCode } from '../security/validation.js';

/**
 * Rotas de QR code.
 * @param {import('fastify').FastifyInstance} fastify
 */
async function routesQR(fastify) {

    // Informações de um item pelo QR Code
    fastify.get('/qr-info/:qrcode', async function (request, reply) {
        const { qrcode } = request.params;

        if (!isValidQRCode(qrcode)) {
            return reply.status(400).send({ status: 'error', message: 'Formato de QR Code inválido.' });
        }

        const items = await getItemsByQRCode(qrcode);

        if (items.length > 0) {
            return reply.status(200).send({ status: 'success', data: items });
        }

        return reply.status(404).send({ status: 'error', message: 'Nenhum item encontrado para o QR Code fornecido.' });
    });
}

export default routesQR;
