-- CreateTable
CREATE TABLE `CATEGORIA` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_supercategoria` INTEGER NULL,
    `nome` VARCHAR(50) NOT NULL,

    INDEX `id_supercategoria`(`id_supercategoria`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CLIENTE` (
    `cpf` VARCHAR(11) NOT NULL,
    `nome` VARCHAR(80) NOT NULL,
    `sobrenome` VARCHAR(80) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `telefone` VARCHAR(11) NOT NULL,
    `dt_nascimento` DATE NOT NULL,

    PRIMARY KEY (`cpf`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CLIENTE_ENDERECO` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cpf_cliente` VARCHAR(11) NOT NULL,
    `endereco_id` VARCHAR(19) NOT NULL,

    INDEX `cpf_cliente`(`cpf_cliente`),
    INDEX `endereco_id`(`endereco_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `COMPRA` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `datetime_compra` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `desconto` DECIMAL(10, 2) NOT NULL,
    `forma_pagamento` VARCHAR(20) NOT NULL,
    `endereco_entrega_id` VARCHAR(19) NOT NULL,
    `cpf_cliente` VARCHAR(11) NULL,

    INDEX `cpf_cliente`(`cpf_cliente`),
    INDEX `endereco_entrega_id`(`endereco_entrega_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `COMPRA_PRODUTOS` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_compra` INTEGER NOT NULL,
    `id_produtos` INTEGER NOT NULL,
    `quantidade` INTEGER NOT NULL,

    INDEX `id_compra`(`id_compra`),
    INDEX `id_produtos`(`id_produtos`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ENDERECO` (
    `numero_cep` VARCHAR(19) NOT NULL,
    `numero` VARCHAR(10) NOT NULL,
    `cep` VARCHAR(8) NOT NULL,
    `bairro` VARCHAR(100) NOT NULL,
    `rua` VARCHAR(100) NOT NULL,
    `estado` VARCHAR(50) NOT NULL,
    `cidade` VARCHAR(50) NOT NULL,
    `complemento` VARCHAR(100) NULL,

    PRIMARY KEY (`numero_cep`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MODELO` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PRODUTOS` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fabricante` VARCHAR(75) NOT NULL,
    `preco_base` DECIMAL(10, 2) NOT NULL,
    `quantidade` INTEGER NOT NULL DEFAULT 0,
    `id_categoria` INTEGER NOT NULL,
    `id_modelo` INTEGER NOT NULL,

    INDEX `id_categoria`(`id_categoria`),
    INDEX `id_modelo`(`id_modelo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SERIE` (
    `numero` INTEGER NOT NULL,
    `id_modelo` INTEGER NULL,

    INDEX `id_modelo`(`id_modelo`),
    PRIMARY KEY (`numero`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CATEGORIA` ADD CONSTRAINT `CATEGORIA_ibfk_1` FOREIGN KEY (`id_supercategoria`) REFERENCES `CATEGORIA`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `CLIENTE_ENDERECO` ADD CONSTRAINT `CLIENTE_ENDERECO_ibfk_1` FOREIGN KEY (`cpf_cliente`) REFERENCES `CLIENTE`(`cpf`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `CLIENTE_ENDERECO` ADD CONSTRAINT `CLIENTE_ENDERECO_ibfk_2` FOREIGN KEY (`endereco_id`) REFERENCES `ENDERECO`(`numero_cep`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `COMPRA` ADD CONSTRAINT `COMPRA_ibfk_1` FOREIGN KEY (`endereco_entrega_id`) REFERENCES `ENDERECO`(`numero_cep`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `COMPRA` ADD CONSTRAINT `COMPRA_ibfk_2` FOREIGN KEY (`cpf_cliente`) REFERENCES `CLIENTE`(`cpf`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `COMPRA_PRODUTOS` ADD CONSTRAINT `COMPRA_PRODUTOS_ibfk_1` FOREIGN KEY (`id_compra`) REFERENCES `COMPRA`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `COMPRA_PRODUTOS` ADD CONSTRAINT `COMPRA_PRODUTOS_ibfk_2` FOREIGN KEY (`id_produtos`) REFERENCES `PRODUTOS`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `PRODUTOS` ADD CONSTRAINT `PRODUTOS_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `CATEGORIA`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `PRODUTOS` ADD CONSTRAINT `PRODUTOS_ibfk_2` FOREIGN KEY (`id_modelo`) REFERENCES `MODELO`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `SERIE` ADD CONSTRAINT `SERIE_ibfk_1` FOREIGN KEY (`id_modelo`) REFERENCES `MODELO`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
