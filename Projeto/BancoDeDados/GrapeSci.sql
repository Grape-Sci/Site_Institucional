DROP DATABASE IF EXISTS GrapeSci;
CREATE DATABASE GrapeSci;

USE GrapeSci;


CREATE TABLE Empresa (
idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(80) NOT NULL,
cep CHAR(8) NOT NULL,
cnpj CHAR(14) NOT NULL UNIQUE,
email VARCHAR(80) NOT NULL UNIQUE,
codAutenticF INT NOT NULL UNIQUE,
codAutenticG INT NOT NULL UNIQUE
);



CREATE TABLE Funcionario (
idFuncionario INT AUTO_INCREMENT,
nome VARCHAR(45) NOT NULL,
cpf CHAR(11) NOT NULL UNIQUE,
senha VARCHAR(45) NOT NULL,
email VARCHAR(80) NOT NULL UNIQUE,
telefone CHAR(11) NOT NULL UNIQUE,
cargo VARCHAR(45) NOT NULL,
CONSTRAINT chkcargo CHECK (cargo IN ('Gerente', 'Funcionario')),
fkEmpresa INT,
PRIMARY KEY (idFuncionario, fkempresa),
FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa)
);

CREATE TABLE Plantacao (
idPlantacao INT PRIMARY KEY AUTO_INCREMENT,
areaTotal DOUBLE NOT NULL,
fkEmpresa INT,
FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa)
);

CREATE TABLE Uva (
idUva INT PRIMARY KEY AUTO_INCREMENT,
nomeTipo VARCHAR(45)NOT NULL,
tempMax DOUBLE NOT NULL,
tempMIN DOUBLE NOT NULL,
umiMIN DOUBLE NOT NULL,
umiMax DOUBLE NOT NULL);

CREATE TABLE Talhao (
idTalhao INT AUTO_INCREMENT,
qtdVieiras INT NOT NULL,
tamAreaPlant DOUBLE NOT NULL,
dtPlantio DATE NOT NULL,
prevColheita DATE NOT NULL,
fkUva INT,
fkPlantacao INT,
PRIMARY KEY (idTalhao, fkPlantacao),
FOREIGN KEY (fkUva) REFERENCES Uva(idUva),
FOREIGN KEY (fkPlantacao) REFERENCES Plantacao(idPlantacao));

CREATE TABLE Dispositivo (
idDispositivo INT PRIMARY KEY AUTO_INCREMENT,
nomeSensor VARCHAR (45),
fkTalhao INT,
FOREIGN KEY (fkTalhao) REFERENCES Talhao(idTalhao));

CREATE TABLE Registro (
idRegistro INT AUTO_INCREMENT,
consultaUmi DOUBLE NOT NULL,
consultaTemp DOUBLE NOT NULL,
registroDt DATETIME NOT NULL,
fkDispositivo INT,
PRIMARY KEY (idRegistro, fkDispositivo),
FOREIGN KEY (fkDispositivo) REFERENCES Dispositivo(idDispositivo)
);

INSERT INTO Empresa (nome, cep, cnpj, email, codAutenticF, codAutenticG) VALUES 
('UvasLTDA', '03910091', '44834157000108','uvasltda@grape.com', 121314, 998566),
('Uvitas', '05910080', '55088157000102','uvitas@uvitas.com', 262728, 232311),
('RoxINhas', '05910080', '60078151000222' ,'Roxinhas@outlook.com', 343536, 777390);

INSERT INTO Funcionario (nome, cpf, senha, email, telefone, cargo, fkEmpresa) VALUES 
('João Silva', '45088953210', 'Lagarto023', 'Joao.Silva@gmail.com', '11957867699', 'Funcionario', 1),
('Tom Donajam', '33908953210', '11DonDon89', 'TomDonajam.gerente@bol.com.br', '11957444909', 'Gerente', 1),
('Rafaela Moreira', '38287926908', 'SeGreDo9575', 'Moreira_gerente1@gmail.com', '16988423151', 'Gerente', 2),
('Marcia Ramos', '46084956731', '0FlashBoot33', 'Marcia.Ramos@outlook.com', '16979723757', 'Funcionario', 2),
('Leonardo Oliveira', '39190926655', '45LeozINGege45', 'Leo3828_Gerente@bol.com.br', '47991123151', 'Gerente', 3),
('Charlotte Freitas', '46060951131', '0212FreitChaCha', 'Char_Freitas@gmail.com', '47900785333', 'Funcionario', 3);

INSERT INTO Plantacao (areaTotal, fkEmpresa) VALUES
(2, 1),
(10, 2),
(5, 3);

INSERT INTO Uva (nomeTipo, tempMax, tempMIN, umiMIN, umiMax) VALUES
('Uva Thompson Seedless', 28.0, 18.0, 60, 70),
('Uva Italia', 30.0, 20.0, 50, 60),
('Uva Rubi', 25.0, 15.0, 60, 70);


INSERT INTO Talhao (qtdVieiras, tamAreaPlant, dtPlantio, prevColheita, fKUva, fkPlantacao) VALUES
(50, 100, '2024-01-05', '2024-05-05', 1, 1),
(40, 90, '2024-05-05', '2024-09-05', 2, 1),
(30, 70, '2024-06-05', '2024-10-05', 3, 1),
(60, 55, '2024-07-05', '2024-11-05', 1, 2), 
(100, 60, '2024-08-05', '2024-12-05', 2, 2), 
(80, 40, '2024-09-05', '2025-01-05', 2, 3);

INSERT INTO Dispositivo (nomeSensor,fkTalhao) VALUES 
('Sensor1', 1),
('Sensor2', 2),
('Sensor3', 3),
('Sensor4', 4),
('Sensor5', 5),
('Sensor6', 6);

INSERT INTO Registro (consultaUmi, consultaTemp, registroDt, fkDispositivo) VALUES 
(10.0, 20.0, NOW(), 1),
(20.0, 21.0, NOW(), 2),
(30.0, 22.0, NOW(), 3),
(40.0, 23.0, NOW(), 4),
(50.0, 24.0, NOW(), 5),
(60.0, 25.0, NOW(), 6);

ALTER TABLE Dispositivo ADD COLUMN Fator FLOAT;

UPDATE Dispositivo SET Fator = 2 WHERE idDispositivo = 1;
UPDATE Dispositivo SET Fator = 1.5 WHERE idDispositivo = 2;
UPDATE Dispositivo SET Fator = 1.2 WHERE idDispositivo = 3;

UPDATE Empresa SET codAutenticF = 111213 WHERE idEmpresa = 1;


DROP VIEW IF EXISTS UltimosRegistrosTalhao;
CREATE VIEW UltimosRegistrosTalhao AS
SELECT r.idRegistro, r.consultaUmi, r.consultaTemp, r.registroDt, r.fkDispositivo, d.fkTalhao FROM Registro AS r
	JOIN (SELECT fkDispositivo, MAX(registroDt) AS UltimaData FROM Registro GROUP BY fkDispositivo) AS UltimosRegistros
		ON r.fkDispositivo = UltimosRegistros.fkDispositivo AND r.registroDt = UltimosRegistros.UltimaData
		 LEFT JOIN Dispositivo d ON r.fkDispositivo = d.idDispositivo;
	