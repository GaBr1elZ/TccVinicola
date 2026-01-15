import { QRCodeRegex } from '../validators/regexValidators';

/**
 * * Checa se o QR Code é válido.
 * 
 * @param {string} qrCode - O QR Code a ser validado.
 * @returns {boolean} Retorna true se o QR Code for válido, caso contrário, false.
 * @throws {TypeError} Se qrCode não for uma string.
 * 
*/
export function isValidQRCode(qrCode: string) {
    if (typeof qrCode === 'string' && QRCodeRegex.test(qrCode)) {
        return true;
    } else {
        return false;
    }
}