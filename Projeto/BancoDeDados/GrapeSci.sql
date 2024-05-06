create database GrapeSci;

use GrapeSci;


create table Empresa (
idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(80) not null,
cep CHAR(8) not null,
cnpj CHAR(14) not null unique,
codAutenticF INT not null unique,
codAutenticG INT not null unique
);

-- Uma empresa pode ter vários funcionarios
create table Funcionario (
idFuncionario INT auto_increment,
nome VARCHAR(45) not null,
cpf CHAR(11) not null unique,
senha VARCHAR(45) not null,
email VARCHAR(80) not null unique,
telefone CHAR(11) not null unique,
cargo VARCHAR(45) not null,
constraint chkcargo check (cargo in ('Gerente', 'Funcionario')),
fkEmpresa INT,
primary key (idFuncionario, fkempresa),
foreign key (fkEmpresa) references Empresa(idEmpresa)
);

-- Uma empresa pode ter várias plantações (obs: 1 plantação pode ter vários talhões)
create table Plantacao (
idPlantacao INT PRIMARY KEY AUTO_INCREMENT,
areaTotal DOUBLE not null,
fkEmpresa INT,
foreign key (fkEmpresa) references Empresa(idEmpresa)
);

-- trabalhamos somente com 3 tipos de uva sendo elas: uva thompson, uva rubi e uva italia
create table Uva (
idUva INT PRIMARY KEY AUTO_INCREMENT,
nomeTipo VARCHAR(45)not null,
tempMax DOUBLE not null,
tempMin DOUBLE not null,
umiMin DOUBLE not null,
umiMax DOUBLE not null);

-- Cada talhão só pode ter 1 tipo de uva e 1 plantação pode ter vários talhões
create table Talhao (
idTalhao INT AUTO_INCREMENT,
qtdVieiras INT not null,
tamAreaPlant DOUBLE not null,
dtPlantio DATE not null,
prevColheita DATE not null,
fkUva INT,
fkPlantacao INT,
primary key (idTalhao, fkPlantacao),
foreign key (fkUva) references Uva(idUva),
foreign key (fkPlantacao) references Plantacao(idPlantacao));

-- cada talhão deve ter apenas 1 dispostivo
create table Dispositivo (
idDispositivo INT PRIMARY KEY AUTO_INCREMENT,
nomeSensor VARCHAR (45),
fkTalhao INT,
foreign key (fkTalhao) references Talhao(idTalhao));

-- 1 dispositivo pode realizar vários registros
create table Registro (
idRegistro INT AUTO_INCREMENT,
consultaUmi DOUBLE not null,
consultaTemp DOUBLE not null,
registroDt DATETIME not null,
fkDispositivo INT,
primary key (idRegistro, fkDispositivo),
foreign key (fkDispositivo) references Dispositivo(idDispositivo)
);

select * from Registro;

-- Inserindo as empresas
INSERT INTO Empresa (nome, cep, cnpj, codAutenticF, codAutenticG) VALUES 
('UvasLTDA', '03910091', '44834157000108', 121314, 998566),
('Uvitas', '05910080', '55088157000102', 262728, 232311),
('Roxinhas', '05910080', '60078151000222' , 343536, 777390);

-- Inserindo os funcionários relacionados a empresa
INSERT INTO Funcionario (nome, cpf, senha, email, telefone, cargo, fkEmpresa) VALUES 
('João Silva', '45088953210', 'Lagarto023', 'Joao.Silva@gmail.com', '11957867699', 'Funcionario', 1),
('Tom Donajam', '33908953210', '11DonDon89', 'TomDonajam.gerente@bol.com.br', '11957444909', 'Gerente', 1),
('Rafaela Moreira', '38287926908', 'SeGreDo9575', 'Moreira_gerente1@gmail.com', '16988423151', 'Gerente', 2),
('Marcia Ramos', '46084956731', '0FlashBoot33', 'Marcia.Ramos@outlook.com', '16979723757', 'Funcionario', 2),
('Leonardo Oliveira', '39190926655', '45LeozinGege45', 'Leo3828_Gerente@bol.com.br', '47991123151', 'Gerente', 3),
('Charlotte Freitas', '46060951131', '0212FreitChaCha', 'Char_Freitas@gmail.com', '47900785333', 'Funcionario', 3);

INSERT INTO Plantacao (areaTotal, fkEmpresa) VALUES
(2,1),
(10,2),
(5,3);

Select * from Plantacao;

-- Inserindo os 3 tipos de uva
INSERT INTO Uva (nomeTipo, tempMax, tempMin, umiMin, umiMax) VALUES
('Uva Thompson Seedless', 28.0, 18.0, 60, 70),
('Uva Italia', 30.0, 20.0, 50, 60),
('Uva Rubi', 25.0, 15.0, 60, 70);


-- Inserindo os talhões relacionadas a cada platação correspondente a cada empresa
INSERT INTO Talhao (qtdVieiras, tamAreaPlant, dtPlantio, prevColheita, fKUva, fkPlantacao) VALUES
(50, 100, '2024-01-05', '2024-05-05', 1, 1),
(40, 90, '2024-05-05', '2024-09-05', 2, 1),
(30, 70, '2024-06-05', '2024-10-05', 3, 1),
(60, 55, '2024-07-05', '2024-11-05', 1, 2), 
(100, 60, '2024-08-05', '2024-12-05', 2, 2), 
(80, 40, '2024-09-05', '2025-01-05', 2, 3);

select * from Talhao;


-- Inserindo os dispositivo de cada plantação
INSERT INTO Dispositivo (nomeSensor,fkTalhao) VALUES 
('Sensor1',1),
('Sensor2',2),
('Sensor3',3),
('Sensor4',4),
('Sensor5',5),
('Sensor6',6);


-- Inserindo os registro de cada dispositivo
INSERT INTO Registro (consultaUmi, consultaTemp, registroDt, fkDispositivo) VALUES 
(10.0, 20.0, current_timestamp, 1),
(20.0, 21.0, current_timestamp, 2),
(30.0, 22.0, current_timestamp, 3),
(40.0, 23.0, current_timestamp, 4),
(50.0, 24.0, current_timestamp, 5),
(60.0, 25.0, current_timestamp, 6);

-- Alterando a tabela dos dispositivos e adiconando o campo fator
ALTER TABLE Dispositivo ADD COLUMN  Fator FLOAT;

-- atualizando os valores no fator para realizar a simulação
UPDATE Dispositivo SET Fator = 2 WHERE idDispositivo = 1;
UPDATE Dispositivo SET Fator = 1.5 WHERE idDispositivo = 2;
UPDATE Dispositivo SET Fator = 1.2 WHERE idDispositivo = 3;


SELECT * FROM Dispositivo;

-- Atualizando o código de autenticação de uma empresa
UPDATE Empresa SET codAutenticF = 111213 WHERE idEmpresa = 1;

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


-- JOIN entre Empresa, Plantação, Talhão, Uva, Dispositivo e registro (completo)
SELECT Dispositivo.idDispositivo, Registro.*, Empresa.nome AS nome_empresa, Empresa.codAutenticF,Empresa.codAutenticG, Plantacao.areaTotal AS area_total_plantio, Talhao.tamAreaPlant AS tamanho_do_talhão, Uva.nomeTipo AS tipo_uva, Talhao.qtdVieiras AS qtd_vieira_plantada, Talhao.dtPlantio AS data_plantação, Talhao.prevColheita AS previsão_colheita
FROM Talhao
JOIN Plantacao ON Plantacao.idPlantacao = Talhao.fkPlantacao
JOIN Empresa ON Empresa.idEmpresa = Plantacao.fkEmpresa
JOIN Uva ON Uva.idUva = Talhao.fkUva
JOIN Dispositivo ON Talhao.idTalhao = Dispositivo.fkTalhao
JOIN Registro ON Dispositivo.idDispositivo = Registro.fkDispositivo;


-- JOIN entre os dispostivos e os registros
SELECT D.idDispositivo,D.nomeSensor, R.consultaUmi, R.consultaTemp, R.registroDt, U.umiMin,U.umiMax, U.tempMin,U.tempMax
FROM Dispositivo AS D
JOIN Registro AS R ON D.idDispositivo = R.fkDispositivo
JOIN Talhao as T ON T.idTalhao = D.fkTalhao
JOIN Uva AS U ON U.idUva = T.fkUva;

-- Simulando a captura de varios sensores
CREATE VIEW teste AS (SELECT
( r.consultaUmi * d.fator) AS Umidade,
(r.consultaTemp * d.fator) AS Temperatura,
d.nomeSensor From Registro as r, Dispositivo as d);

SELECT * FROM teste;

-- Selecionando da view teste os dados dos sensor2 e do sensor1 e ordenando pelo seus nomes em ordem crescente
SELECT * FROM teste WHERE nomeSensor = 'Sensor2' or nomeSensor = 'Sensor1'order by nomeSensor;