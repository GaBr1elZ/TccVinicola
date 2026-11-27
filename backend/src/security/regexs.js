/**
 * Expressões regulares usadas nas validações.
 * QRCodeRegex: 'QR' seguido de exatamente três dígitos (ex.: QR001).
 */
export const QRCodeRegex = /^QR[0-9]{3}$/;
export const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const DateRegex = /^\d{4}-\d{2}-\d{2}$/;
export const TimeRegex = /^([01]\d|2[0-3]):[0-5]\d$/;
