create database GrapeSci;

use GrapeSci;

drop database GrapeSci;

create table Empresa (
idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(80) not null,
cep CHAR(8) not null,
cnpj CHAR(14) not null unique,
codAutentic INT not null unique
);

create table Funcionario (
idFuncionario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45) not null,
cpf CHAR(11) not null unique,
senha VARCHAR(45) not null,
email VARCHAR(80) not null unique,
telefone CHAR(11) not null unique,
cargo VARCHAR(45) not null,
constraint chkcargo check (cargo in ('Gerente', 'Funcionario')),
fkEmpresa INT,
foreign key (fkEmpresa) references Empresa(idEmpresa)
);

create table Estufa (
idEstufa INT PRIMARY KEY AUTO_INCREMENT,
bloco VARCHAR(45) not null,
fkEmpresa INT,
foreign key (fkEmpresa) references Empresa(idEmpresa)
);

create table Plantacao (
idCadastroUva INT PRIMARY KEY AUTO_INCREMENT,
qtdVieiras INT not null,
qtdAreaPlant DOUBLE not null,
fkEstufa INT,
foreign key (fkEstufa) references Estufa(idEstufa)
);

create table Uva (
idUva INT PRIMARY KEY AUTO_INCREMENT,
nomeTipo VARCHAR(45)not null ,
fkPlantacao INT,
foreign key (fkPlantacao) references Plantacao(idCadastroUva)
);

create table Metrica (
idMetrica INT PRIMARY KEY AUTO_INCREMENT,
tempIdeal DOUBLE not null,
umiIdeal DOUBLE not null,
fkUva INT,
foreign key (fkUva) references Uva(idUva)
);

create table Dispositivo (
idDispositivo INT PRIMARY KEY AUTO_INCREMENT,
fkPlantacao INT,
foreign key (fkPlantacao) references Plantacao(idCadastroUva)
);

create table Registro (
idRegistros INT PRIMARY KEY AUTO_INCREMENT,
consultaUmi DOUBLE not null,
consultaTemp DOUBLE not null,
registroDt DATETIME not null,
fkDispositivo INT,
foreign key (fkDispositivo) references Dispositivo(idDispositivo)
);

-- Inserindo as empresas
INSERT INTO Empresa (nome, cep, cnpj, codAutentic) VALUES 
('UvasLTDA', '03910091', '44834157000108', 121314),
('Uvitas', '05910080', '55088157000102', 262728),
('Roxinhas', '05910080', '68988157000499', 343536);

-- Inserindo os funcionários relacionados a empresa
INSERT INTO Funcionario (nome, cpf, senha, email, telefone, cargo, fkEmpresa) VALUES 
('João Silva', '45088953210', 'Lagarto023', 'Joao.Silva@gmail.com', '11957867699', 'Funcionario', 1),
('Tom Donajam', '33908953210', '11DonDon89', 'TomDonajam.gerente@bol.com.br', '11957444909', 'Gerente', 1),
('Rafaela Moreira', '38287926908', 'SeGreDo9575', 'Moreira_gerente1@gmail.com', '16988423151', 'Gerente', 2),
('Marcia Ramos', '46084956731', '0FlashBoot33', 'Marcia.Ramos@outlook.com', '16979723757', 'Funcionario', 2),
('Leonardo Oliveira', '39190926655', '45LeozinGege45', 'Leo3828_Gerente@bol.com.br', '47991123151', 'Gerente', 3),
('Charlotte Freitas', '46060951131', '0212FreitChaCha', 'Char_Freitas@gmail.com', '47900785333', 'Funcionario', 3);

-- Inserindo as estufas de cada empresa
INSERT INTO Estufa (bloco, fkEmpresa) VALUES
('Bloco-A', 1),
('Bloco-B', 1),
('Bloco-C', 1),
('Bloco A', 1), -- a empresa 1 tem 2 estufas a primeira com 3 blocos e a segunda com apenas 1 bloco
('Bloco Alpha', 2), -- a empresa 2 tem 1 estufa com 1 bloco
('Bloco A1', 3), -- a empresa 3 tem 1 estufa com  2 blocos
('Bloco B1', 3);


-- Inserindo as plantações relacionadas a cada estufa e consequentemente de cada bloco
INSERT INTO Plantacao (qtdVieiras, qtdAreaPlant, fkEstufa) VALUES
(50, 50.0, 1),
(50, 50.0, 2),
(50, 50.0, 3),
(60, 55.0, 4), -- empresa 1 até aqui
(100, 80.0, 5), -- empresa 2 apenas esse
(80, 40.0, 6), -- empresa 3 desse até o ultimo
(80, 40.0, 7);

-- Inserindo os 3 tipos de uva
INSERT INTO Uva (nomeTipo, fkPlantacao) VALUES
('Uva Thompson Seedless', 1),
('Uva Crimson Seedless', 2),
('Uva Italia', 3), 
('Uva Italia', 4),
('Uva Crimson Seedless', 5),
('Uva Italia', 6),
('Uva Crimson Seedless', 7);

-- Inserindo as métricas de cada tipo de uva
INSERT INTO Metrica (tempIdeal, umiIdeal, fkUva) VALUES 
(21.0, 60.0, 1),
(23.0, 40.0, 2),
(25.0, 80.0, 3),
(25.0, 80.0, 4),
(23.0, 40.0, 5),
(25.0, 80.0, 6),
(23.0, 40.0, 7);


-- Inserindo os dispositivo de cada plantação
INSERT INTO Dispositivo (fkPlantacao) VALUES 
(1),
(2),
(3),
(4),
(5),
(6),
(7);


-- Inserindo os registro de cada dispositivo
INSERT INTO Registro (consultaUmi, consultaTemp, registroDt, fkDispositivo) VALUES 
(10.0, 20.0, current_timestamp, 1),
(20.0, 21.0, current_timestamp, 2),
(30.0, 22.0, current_timestamp, 3),
(40.0, 23.0, current_timestamp, 4),
(50.0, 24.0, current_timestamp, 5),
(60.0, 25.0, current_timestamp, 6),
(70.0, 26.0, current_timestamp, 7);

-- Atualizando o código de autenticação de uma empresa para 12345
UPDATE Empresa SET codAutentic = 111213 WHERE idEmpresa = 1;



-- JOIN entre Funcionario e Empresa usando a chave estrangeira fkEmpresa
SELECT Funcionario.nome, Empresa.nome
FROM Funcionario JOIN Empresa ON idEmpresa = fkEmpresa;


-- JOIN entre Estufa e Empresa usando a chave estrangeira fkEmpresa
SELECT *
FROM Estufa AS est
JOIN Empresa AS e ON e.idEmpresa = est.fkEmpresa;


-- JOIN entre Uva, Plantacao, Estufa e Empresa
SELECT Estufa.idEstufa, Estufa.bloco, Plantacao.idCadastroUva, Plantacao.qtdVieiras, Plantacao.qtdAreaPlant, Uva.nomeTipo, Empresa.nome AS nomeEmpresa
FROM Estufa
JOIN Plantacao ON Plantacao.idCadastroUva = Plantacao.fkEstufa
JOIN Uva ON Uva.idUva = Uva.fkPlantacao
JOIN Empresa ON Estufa.fkEmpresa = Empresa.idEmpresa;


-- JOIN entre Metrica e Uva 
SELECT Metrica.tempIdeal, Metrica.umiIdeal, Uva.nomeTipo
FROM Metrica
JOIN Uva ON  Uva.idUva = Metrica.FKUva;
select * from Dispositivo;


-- Join de registros, dispositivos, plantacao, estufa e empresa
SELECT Registro.consultaUmi, Registro.consultaTemp, Registro.registroDt, Dispositivo.idDispositivo, Estufa.bloco, Empresa.nome AS nomeEmpresa, Uva.nomeTipo
FROM Registro
JOIN Dispositivo ON Dispositivo.idDispositivo = Registro.fkDispositivo 
JOIN Plantacao as p ON p.idCadastroUva = Dispositivo.fkPlantacao 
JOIN Uva ON Uva.idUva = p.fkEstufa
JOIN Estufa ON Estufa.idEstufa = p.fkEstufa
JOIN Empresa ON Empresa.idEmpresa = Estufa.fkEmpresa;



-- Join entre a estufa e a plantação
SELECT Estufa.idEstufa, Estufa.bloco, Plantacao.idCadastroUva, Plantacao.qtdVieiras, Plantacao.qtdAreaPlant
FROM Estufa
JOIN Plantacao ON Estufa.idEstufa = Plantacao.fkEstufa;


-- Join entre os dispostivos e os registros
SELECT D.idDispositivo, R.consultaUmi, R.consultaTemp, R.registroDt
FROM Dispositivo AS D
JOIN Registro AS R ON D.idDispositivo = R.fkDispositivo;



