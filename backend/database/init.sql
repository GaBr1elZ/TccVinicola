-- Banco completo da API da Vinícola: tabelas + dados de exemplo.
-- Roda sozinho no Docker (docker compose up) ou manualmente:
--   mysql -u root -p < database/init.sql

CREATE DATABASE IF NOT EXISTS `vinicola_tcc` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `vinicola_tcc`;

-- Itens da vinícola, cada um com um QR code
CREATE TABLE IF NOT EXISTS `itens_qr` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome_item` varchar(100) NOT NULL,
  `localizacao` varchar(100) NOT NULL,
  `descricao` text NOT NULL,
  `qr_code` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_itens_qr_code` (`qr_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Imagens de cada item
CREATE TABLE IF NOT EXISTS `imagens_itens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `item_id` int NOT NULL,
  `imagem_url` varchar(500) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_imagens_item` (`item_id`),
  CONSTRAINT `fk_imagens_item` FOREIGN KEY (`item_id`) REFERENCES `itens_qr` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Usuários do app (senha guardada com bcrypt)
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `telefone` varchar(30) DEFAULT NULL,
  `criado_em` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_usuarios_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Reservas de visitas
CREATE TABLE IF NOT EXISTS `reservas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `nome_cliente` varchar(100) NOT NULL,
  `email_cliente` varchar(150) NOT NULL,
  `telefone_cliente` varchar(30) NOT NULL,
  `data_visita` date NOT NULL,
  `horario_visita` char(5) NOT NULL,
  `numero_visitantes` int NOT NULL DEFAULT 1,
  `tipo_tour` enum('basico','premium','exclusivo') NOT NULL,
  `observacoes` text,
  `status` enum('pendente','confirmada','cancelada','concluida') NOT NULL DEFAULT 'pendente',
  `criado_em` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_reservas_usuario` (`usuario_id`),
  KEY `idx_reservas_horario` (`data_visita`, `horario_visita`),
  CONSTRAINT `fk_reservas_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dados de exemplo (só entram se as tabelas estiverem vazias)
INSERT IGNORE INTO `itens_qr` VALUES (1,'Parreira Cabernet Sauvignon','Vinhedo Setor A','Essas parreiras foram plantadas em 2005 e produzem uvas Cabernet Sauvignon, conhecidas por seu sabor encorpado e aroma de frutas escuras.','QR001'),(2,'Parreira Syrah','Vinhedo Setor B','As uvas Syrah cultivadas aqui geram vinhos intensos, com notas de especiarias e taninos marcantes.','QR002'),(3,'Barril de Carvalho Francês','Adega 1','Este barril de carvalho francês é usado para envelhecer vinhos tintos, agregando aromas de baunilha e notas amadeiradas.','QR003'),(4,'Tanque de Inox','Área de Produção','Tanques de aço inoxidável mantêm o controle de temperatura, garantindo frescor e pureza no processo de fermentação.','QR004'),(5,'Sala Histórica','Centro de Visitação','Espaço dedicado à história da vinícola, fundada em 1980, preservando documentos e fotografias originais.','QR005'),(6,'Premiação 2018','Hall de Troféus','Em 2018, esta vinícola recebeu medalha de ouro em um concurso internacional pelo Cabernet Sauvignon Reserva.','QR006'),(7,'Jardim Sensorial','Área Externa','Neste jardim, visitantes podem tocar, cheirar e experimentar ervas e frutas usadas para harmonização de vinhos.','QR007'),(8,'Sala de Degustação','Bloco Principal','Ambiente projetado para experiências guiadas de degustação, com temperatura e iluminação controladas.','QR008'),(9,'Garrafa Reserva Cabernet 2019','Loja da Vinícola','Vinho encorpado, com notas de frutas vermelhas maduras e final persistente. Ideal para carnes e queijos fortes.','QR009'),(10,'Espumante Brut Rosé','Loja da Vinícola','Espumante leve e refrescante, com notas de morango e cereja. Produzido pelo método Charmat.','QR010');

INSERT IGNORE INTO `imagens_itens` VALUES (1,1,'https://placehold.co/800x533/FFDDDD/333.jpg?text=Parreira+Cabernet+1&font=roboto'),(2,1,'https://placehold.co/800x800/DDFFDD/222.jpg?text=Parreira+Cabernet+2&font=roboto'),(3,2,'https://placehold.co/800x533/DDDDFF/111.jpg?text=Parreira+Syrah+1&font=roboto'),(4,2,'https://placehold.co/800x1200/FFEEDD/222.jpg?text=Parreira+Syrah+2&font=roboto'),(5,3,'https://placehold.co/800x533/F5F5DC/333.jpg?text=Barril+Carvalho+Frances+1&font=roboto'),(6,3,'https://placehold.co/800x800/DDEEFF/222.jpg?text=Barril+Carvalho+Frances+2&font=roboto'),(7,3,'https://placehold.co/800x1200/E0FFE0/111.jpg?text=Barril+Carvalho+Frances+3&font=roboto'),(8,4,'https://placehold.co/800x533/C0C0C0/000.jpg?text=Tanque+Inox+1&font=roboto'),(9,4,'https://placehold.co/800x800/EEEEEE/333.jpg?text=Tanque+Inox+2&font=roboto'),(10,5,'https://placehold.co/800x533/FFF8DC/111.jpg?text=Sala+Historica+1&font=roboto'),(11,5,'https://placehold.co/800x800/F5DEB3/000.jpg?text=Sala+Historica+2&font=roboto'),(12,6,'https://placehold.co/800x533/E6E6FA/222.jpg?text=Premiacao+2018+1&font=roboto'),(13,6,'https://placehold.co/800x800/FFDAB9/111.jpg?text=Premiacao+2018+2&font=roboto'),(14,7,'https://placehold.co/800x533/98FB98/222.jpg?text=Jardim+Sensorial+1&font=roboto'),(15,7,'https://placehold.co/800x1200/87CEEB/111.jpg?text=Jardim+Sensorial+2&font=roboto'),(16,7,'https://placehold.co/800x800/FFB6C1/000.jpg?text=Jardim+Sensorial+3&font=roboto'),(17,8,'https://placehold.co/800x533/F0FFF0/222.jpg?text=Sala+Degustacao+1&font=roboto'),(18,8,'https://placehold.co/800x800/FFE4E1/111.jpg?text=Sala+Degustacao+2&font=roboto'),(19,9,'https://placehold.co/800x533/FAFAD2/222.jpg?text=Reserva+Cabernet+2019+1&font=roboto'),(20,9,'https://placehold.co/800x800/FFEFD5/111.jpg?text=Reserva+Cabernet+2019+2&font=roboto'),(21,9,'https://placehold.co/800x1200/F5FFFA/000.jpg?text=Reserva+Cabernet+2019+3&font=roboto'),(22,10,'https://placehold.co/800x533/FFF0F5/111.jpg?text=Espumante+Brut+Rose+1&font=roboto'),(23,10,'https://placehold.co/800x800/FFCCE5/000.jpg?text=Espumante+Brut+Rose+2&font=roboto');
