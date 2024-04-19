CREATE DATABASE GrapeSci;

USE GrapeSci;

CREATE TABLE Empresa (
idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(80) NOT NULL,
cep CHAR(8) NOT NULL,
cnpj CHAR(14) NOT NULL UNIQUE,
codAutentic INT NOT NULL UNIQUE
);

CREATE TABLE Funcionario (
idFuncionario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45) NOT NULL,
cpf CHAR(11) NOT NULL UNIQUE,
senha VARCHAR(45) NOT NULL,
email VARCHAR(80) NOT NULL UNIQUE,
telefone CHAR(11) NOT NULL UNIQUE,
cargo VARCHAR(45) NOT NULL,
fkEmpresa INT,
CONSTRAINT chkcargo check (cargo IN ('Gerente', 'Funcionario')),
CONSTRAINT fkFuncEmpresa FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa)
);

CREATE TABLE  Plantacao (
idPlantacao INT PRIMARY KEY AUTO_INCREMENT,
areaTotal DOUBLE NOT NULL,
fkEmpresa INT,
CONSTRAINT fkPlantEmpresa FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa)
);

CREATE TABLE Uva (
idUva INT PRIMARY KEY AUTO_INCREMENT,
nomeTipo VARCHAR(45)NOT NULL ,
tempIdeal DOUBLE NOT NULL,
umiIdeal DOUBLE NOT NULL
);

CREATE TABLE Talhao (
idTalhao INT PRIMARY KEY AUTO_INCREMENT,
qtdVieiras INT NOT NULL,
tamAreaPlant DOUBLE NOT NULL,
dtPlantio DATE NOT NULL,
prevColheita DATE NOT NULL,
fkUva INT,
fkPlantacao INT,
CONSTRAINT fkTalhaoUva FOREIGN KEY (fkUva) REFERENCES Uva(idUva),
CONSTRAINT fkPlantTalhao FOREIGN KEY (fkPlantacao) REFERENCES Plantacao(idPlantacao)
);


CREATE TABLE Dispositivo (
idDispositivo INT PRIMARY KEY AUTO_INCREMENT,
fkTalhao INT,
FOREIGN KEY (fkTalhao) REFERENCES Talhao(idTalhao)
);

CREATE TABLE Registro (
idRegistro INT PRIMARY KEY AUTO_INCREMENT,
consultaUmi DOUBLE NOT NULL,
consultaTemp DOUBLE NOT NULL,
registroDt DATETIME NOT NULL,
fkDispositivo INT,
FOREIGN KEY (fkDispositivo) REFERENCES Dispositivo(idDispositivo)
);

-- Inserindo as empresas
INSERT INTO Empresa (nome, cep, cnpj, codAutentic) VALUES 
('UvasLTDA', '03910091', '44834157000108', 121314),
('Uvitas', '05910080', '55088157000102', 262728),
('RoxINhas', '05910080', '60078151000222' , 343536);

-- Inserindo os funcionários relacionados a empresa
INSERT INTO Funcionario (nome, cpf, senha, email, telefone, cargo, fkEmpresa) VALUES 
('João Silva', '45088953210', 'Lagarto023', 'Joao.Silva@gmail.com', '11957867699', 'Funcionario', 1),
('Tom Donajam', '33908953210', '11DonDon89', 'TomDonajam.gerente@bol.com.br', '11957444909', 'Gerente', 1),
('Rafaela Moreira', '38287926908', 'SeGreDo9575', 'Moreira_gerente1@gmail.com', '16988423151', 'Gerente', 2),
('Marcia Ramos', '46084956731', '0FlashBoot33', 'Marcia.Ramos@outlook.com', '16979723757', 'Funcionario', 2),
('Leonardo Oliveira', '39190926655', '45LeozINGege45', 'Leo3828_Gerente@bol.com.br', '47991123151', 'Gerente', 3),
('Charlotte Freitas', '46060951131', '0212FreitChaCha', 'Char_Freitas@gmail.com', '47900785333', 'Funcionario', 3);

INSERT INTO Plantacao (areaTotal, fkEmpresa) VALUES
(2,1),
(10,2),
(5,3);

SELECT * FROM Plantacao;

-- Inserindo os 3 tipos de uva
INSERT INTO Uva (nomeTipo,tempIdeal, umiIdeal) VALUES
('Uva Thompson Seedless', 21.0, 60.0),
('Uva Crimson Seedless', 23.0, 40.0),
('Uva Italia', 25.0, 80.0);

-- Inserindo os talhões relacionadas a cada platação correspondente a cada empresa
INSERT INTO Talhao (qtdVieiras, tamAreaPlant, dtPlantio, prevColheita, fKUva, fkPlantacao) VALUES
(50, 100, '2024-01-05', '2024-05-05', 1, 1),
(40, 90, '2024-05-05', '2024-09-05', 2, 1),
(30, 70, '2024-06-05', '2024-10-05', 3, 1),
(60, 55, '2024-07-05', '2024-11-05', 1, 2), 
(100, 60, '2024-08-05', '2024-12-05', 2, 2), 
(80, 40, '2024-09-05', '2025-01-05', 2, 3);

SELECT * FROM Talhao;


-- Inserindo os dispositivo de cada plantação
INSERT INTO Dispositivo (fkTalhao) VALUES 
(1),
(2),
(3),
(4),
(5),
(6);


-- Inserindo os registro de cada dispositivo
INSERT INTO Registro (consultaUmi, consultaTemp, registroDt, fkDispositivo) VALUES 
(10.0, 20.0, current_timestamp, 1),
(20.0, 21.0, current_timestamp, 2),
(30.0, 22.0, current_timestamp, 3),
(40.0, 23.0, current_timestamp, 4),
(50.0, 24.0, current_timestamp, 5),
(60.0, 25.0, current_timestamp, 6);

-- Atualizando o código de autenticação de uma empresa
UPDATE Empresa SET codAutentic = 111213 WHERE idEmpresa = 1;

-- Selecionar a tabela uva 
SELECT * FROM Uva;


-- JOIN entre Funcionario e Empresa usando a chave estrangeira fkEmpresa
SELECT Funcionario.nome, Empresa.nome
FROM Funcionario JOIN Empresa ON idEmpresa = fkEmpresa;


-- JOIN entre a Plantação, Empresa e Talhao
SELECT *
FROM Plantacao AS p
JOIN Empresa AS e ON e.idEmpresa = p.fkEmpresa
JOIN Talhao AS t ON p.idPlantacao = t.fkPlantacao;


-- JOIN entre Empresa, Plantação, Talhão, Uva, Dispositivo e registro
SELECT Dispositivo.idDispositivo, Registro.*, Empresa.nome AS nome_empresa, Plantacao.areaTotal AS area_total_plantio, Talhao.tamAreaPlant AS tamanho_do_talhão, Uva.nomeTipo AS tipo_uva, Talhao.qtdVieiras AS qtd_vieira_plantada, Talhao.dtPlantio AS data_plantação, Talhao.prevColheita AS previsão_colheita
FROM Talhao
JOIN Plantacao ON Plantacao.idPlantacao = Talhao.fkPlantacao
JOIN Empresa ON Empresa.idEmpresa = Plantacao.fkEmpresa
JOIN Uva ON Uva.idUva = Talhao.fkUva
JOIN Dispositivo ON Talhao.idTalhao = Dispositivo.fkTalhao
JOIN Registro ON Dispositivo.idDispositivo = Registro.fkDispositivo;


-- JOIN entre os dispostivos e os registros
SELECT D.idDispositivo, R.consultaUmi, R.consultaTemp, R.registroDt
FROM Dispositivo AS D
JOIN Registro AS R ON D.idDispositivo = R.fkDispositivo



