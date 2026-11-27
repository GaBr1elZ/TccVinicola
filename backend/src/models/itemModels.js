import { execute } from './db.js';

/**
 * Busca o item ligado a um QR code, com as URLs das imagens.
 * @param {string} qrCode
 * @returns {Promise<Array>} lista com o item, ou vazia se não existir
 */
export async function getItemsByQRCode(qrCode) {
    const [item] = await execute('SELECT * FROM itens_qr WHERE qr_code = ?', [qrCode]);

    if (!item) {
        return [];
    }

    const images = await execute('SELECT imagem_url FROM imagens_itens WHERE item_id = ?', [item.id]);
    item.images = images.map((img) => img.imagem_url);

    return [item];
}
