# API da Vinícola (TCC)

> Esta pasta é uma cópia da API do repositório [yRizer/TestesTccVinicola](https://github.com/yRizer/TestesTccVinicola), para rodar app e API juntos. O deploy no Railway continua saindo de lá. Da raiz do app, `npm run api` sobe tudo.

Back-end do meu TCC de Engenharia de Computação na Unipinhal. Cada item da vinícola recebe um QR code; ao ler o código, o app consulta esta API e recebe os dados do item com as suas imagens. A API também cuida do cadastro e login dos visitantes e das reservas de visitas, tudo em MySQL.

## Stack

- Node.js (ES Modules) com Fastify 5
- MySQL com `mysql2` (pool de conexões)
- Senhas com `bcryptjs`, CORS com `@fastify/cors`
- Docker Compose para subir API + banco com um comando

## Como rodar

### Com Docker (mais fácil)

```bash
docker compose up -d
```

Sobe o MySQL já com as tabelas e os itens de exemplo (`database/init.sql`) e a API em `http://localhost:3333`. Para ver se está no ar: `curl http://localhost:3333/`.

### Sem Docker

1. Crie o banco rodando `database/init.sql` no seu MySQL.
2. Copie `.env.example` para `.env` e preencha a senha do banco.
3. Instale e rode:

   ```bash
   npm install
   npm run dev
   ```

### Usando no celular

O app no celular não enxerga `localhost` do computador. Use o IP do computador na rede, por exemplo `http://192.168.0.10:3333`, no `EXPO_PUBLIC_API_URL` do app.

## Endpoints

Todas as respostas seguem `{ "status": "success" | "error", "data"?, "message"? }`.

| Método | Rota | Descrição |
| --- | --- | --- |
| `GET` | `/` | Health check |
| `GET` | `/qr-info/:qrcode` | Item ligado ao QR code (`QR` + 3 dígitos), com as imagens |
| `POST` | `/auth/register` | Cadastro: `nome`, `email`, `senha` (mín. 6), `telefone` opcional |
| `POST` | `/auth/login` | Login com `email` e `senha`; devolve o usuário sem a senha |
| `GET` | `/auth/user/:id` | Dados do usuário |
| `PUT` | `/auth/user/:id` | Atualiza `nome` e `telefone` |
| `POST` | `/reservations` | Cria reserva (valida data futura, horário, tipo de tour e vagas) |
| `GET` | `/reservations/check-availability/:data/:horario` | Vagas restantes no horário |
| `GET` | `/reservations/user/:usuarioId` | Reservas do usuário |
| `GET` | `/reservations/:id` | Uma reserva |
| `PUT` | `/reservations/:id` | Edita a reserva |
| `PATCH` | `/reservations/:id/status` | `pendente`, `confirmada`, `cancelada` ou `concluida` |
| `DELETE` | `/reservations/:id` | Remove a reserva |

Exemplos prontos em `routes.http`. A capacidade por horário vem de `VAGAS_POR_HORARIO` (padrão 20).

## Deploy no Railway

O Railway usa a branch `master`. Defina as variáveis `MYSQL_HOST`, `MYSQL_PORT`, `MYSQL_USER`, `MYSQL_PASSWORD` e `MYSQL_DATABASE` (as do plugin MySQL do Railway) e rode `database/init.sql` uma vez no banco. A porta vem de `PORT`, que o Railway define sozinho.

## Estrutura

```
database/init.sql   tabelas + dados de exemplo
src/
  server.js         inicia o servidor
  app.js            Fastify, CORS e registro das rotas
  routes/           QR code, autenticação e reservas
  models/           consultas ao MySQL
  security/         validações (QR code, e-mail, data, horário, reserva)
  config/           pool de conexão com o banco
```

---

Mais projetos no meu portfólio: [yrizer.github.io/Portifolio](https://yrizer.github.io/Portifolio/)
