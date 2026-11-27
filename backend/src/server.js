import app from './app.js';

(async () => {
    try {
        // O Railway define PORT; localmente usa 3333
        const port = Number(process.env.PORT) || 3333;
        await app.listen({ port, host: '0.0.0.0' });
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
})();

for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, async () => {
    app.log.info(`Recebeu ${signal}. Encerrando...`);
    try { await app.close(); } catch (e) { app.log.error(e); }
    process.exit(0);
});