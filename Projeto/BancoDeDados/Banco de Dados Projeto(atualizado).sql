-- GrapeSci

CREATE DATABASE sprint;
use sprint;

-- TABELA QUE ARMAZENA OS DADOS DA CONTA DO USUÁRIO
CREATE TABLE cadastroUsuario (
	IDusuario int primary key auto_increment,-- CHAVE PRIMÁRIA, INTEIRA E DE AUTO INCREMENTO, COMPLEMENTA AUTOMATICAMENTE
    usuario varchar(40) not null,-- CAMPO COM LIMITE DE 40 CARÁCTERES, NÃO PODE ESTAR VAZIO E ARMAZENA O USUÁRIO DA EMPRESA
    nome varchar(40) not null, -- CAMPO COM LIMITE DE 40 CARÁCTERES, NÃO PODE ESTAR VAZIO E ARMAZENA O NOME DO USUÁRIO
    senha varchar(40) not null, -- CAMPO COM LIMITE DE 40 CARÁCTERES, NÃO PODE ESTAR VAZIO E ARMAZENA A SENHA CADASTRADA
    cnpj varchar(14) not null,-- CAMPO COM LIMITE DE 14 CARÁCTERES, NÃO PODE ESTAR VAZIO E ARAMAZENA O CNPJ CADASTRADO
    telefone varchar(14), -- CAMPO COM LIMITE DE 14 CARÁCTERES E ARMAZENA O TELEFONE CADASTRADO
    email varchar(50) -- CAMPO COM LIMITE DE 50 CARÁCTERES E ARMAZENA O EMAIL CADASTRADO
);

-- TABELA QUE SERVE PARA CADASTRAR AS UVAS E SUAS INFORMAÇÕES NECESSÁRIAS
CREATE TABLE cadastroUva(
	idUva int primary key auto_increment,-- CHAVE PRIMÁRIA, INTEIRA E DE AUTO INCREMENTO, COMPLEMENTA AUTOMATICAMENTE
    variacao varchar(40) not null, -- CAMPO COM LIMITE DE 40 CARÁCTERES E NÃO PODE ESTAR VAZIO 
    corUva varchar(40), -- CAMPO COM LIMITE DE 40 CARÁCTERES 
    tipodesolo varchar(40), -- CAMPO COM LIMITE DE 40 CARÁCTERES 
    epocaColheita varchar(40), -- CAMPO COM LIMITE DE 40 CARÁCTERES 
    tempReq double not null, -- CAMPO DOUBLE, ONDE RECEBE DECIMAIS E EXIGIE A TEMPERATURA REQUIRIDA DA UVA
    umidadeReq double not null -- CAMPO DOUBLE, ONDE RECEBE DECIMAIS E EXIGIE A UMIDADE REQUIRIDA DA UVA
);

-- TABELA QUE SERVE PARA REGISTRAR O TEMPO DE IRRIGAÇÃO
CREATE TABLE tempo (
	idTempo int primary key auto_increment,-- CHAVE PRIMÁRIA, INTEIRA E DE AUTO INCREMENTO, COMPLEMENTA AUTOMATICAMENTE
    estacao varchar(20),-- CAMPO COM LIMITE DE 20 CARÁCTERES 
    tempoinicial datetime,-- CAMPO QUE RECEBE O TEMPO INICIAL EM QUE FOI REGADO
    tempofinal datetime -- CAMPO QUE RECEBE O TEMPO EM QUE FOI CONCLUIDO O QUE FOI REGADO
);

-- TABELA QUE ARMAZENA OS DADOS TRAZIDOS PELO SENOR ATRAVÉS DO ARDUÍNO
CREATE TABLE equipamento(
	idEquipamento int primary key auto_increment,-- CHAVE PRIMÁRIA, INTEIRA E DE AUTO INCREMENTO, COMPLEMENTA AUTOMATICAMENTE
    nomeEquip varchar (50), -- CAMPO COM LIMITE DE 50 CARÁCTERES 
    quantEquip int,-- CAMPO INTEIRO, RECEBE SOMENTE NÚMEROS INTEIROS
    duracaoEquip varchar(20), -- CAMPO COM LIMITE DE 20 CARÁCTERES 
    valorEquip varchar(20),-- CAMPO COM LIMITE DE 20 CARÁCTERES 
    consulta_umidade double,
    consulta_temperatura double
);
-- INSERT QUE FUNCIONA PARA REALIZAR A INSERÇÃO DE DADOS EM UMA TABELA

-- CADASTRO USUARIO
INSERT INTO cadastroUsuario (usuario, nome, senha, cnpj, email, telefone) VALUES 
	('Teste' , 'Nome teste', '123', '00.000.000/0001', 'teste@email.com', '11778765432'),
	('Teste2' , 'Nome Genérico', '124', '00.000.000/0002', 'generico@email.com', '11987662233'),
	('Teste2' , 'Apelido Fantasia', '125', '00.000.000/0003', 'fantasia@email.com', '11345656789'),
	('ferBran', 'Fernando Brandão', '126', '00.000.000/0004', 'fernando.sptech@sptech.school', '11912345678'),
	('juMar', 'Julia Marlene', '127', '00.000.000/0005', 'julia.marlene@sptech.school', '11987654321');

INSERT INTO  cadastroUva (variacao, corUva, tipodesolo, epocaColheita, tempReq, umidadeReq) VALUES
	('Chardonnay', 'Verde', 'Terra Adubada Marrom', 'Inverno', '17', '20'),
    ('Garnacha', 'Roxa', 'Terra Roxa', 'Primavera', '17', '20'),
    ('Tempranillo','Roxa','Terra Roxa','Verão','17','20'),
    ('Sauvignon Blanc', 'Verde', 'Terra Adubada Marrom', 'Outono', '17', '20');

INSERT INTO tempo (estacao, tempoinicial, tempofinal) VALUES
	('Primavera', current_timestamp(), current_timestamp()),
    ('Verão', '2024-03-20 15:30:40', '2024-03-20 15:30:40'),
    ('Outono', '2024-03-20 15:30:40', '2024-03-20 15:30:40'),
    ('Inverno', current_timestamp(), current_timestamp());
    
INSERT INTO equipamento(nomeEquip, quantEquip, duracaoEquip, valorEquip, consulta_umidade, consulta_temperatura) VALUES
	('DHT11', '20', '2 anos', '7.90', '20', '15'),
	('DHT11', '20', '2 anos', '7.90', '17', '17'),
	('DHT11', '20', '2 anos', '7.90', '19', '20');
    
-- ALTER TABLE PARA REALIZAR MODIFICAÇÕES NAS TABELAS ABAIXO
ALTER TABLE cadastroUva MODIFY COLUMN corUVa varchar(30); -- MODIFICA UMA COLUNA JÁ EXISTENTE
ALTER TABLE cadastroUsuario MODIFY COLUMN cnpj varchar(15); -- PERMITE A CRIAÇÃO DE CNPJ'S CORRETOS
ALTER TABLE cadastroUva ADD COLUMN campoTeste varchar(30); -- ADICIONA UMA NOVA COLUNA NA TABELA
ALTER TABLE cadastroUva DROP COLUMN	campoTeste; -- EXCLUI UMA COLUNA DA TABELA

-- ATUALIZAR UMA TUPLA DA TABELA
UPDATE cadastroUsuario SET nome= 'Thiago Bona' WHERE id = 1;

-- SELECIONAR TODOS OS DADOS DA TABELA
SELECT * FROM cadastroUsuario;

-- SELECIONAR USUARIOS DE FORMA FILTRADA.
SELECT nome FROM cadastroUsuario WHERE nome LIKE "F%"; -- SELECIONA TODOS OS USUÁRIOS QUE CONTEREM O NOME QUE COMECE COM LETRA F
SELECT nome FROM cadastroUsuario WHERE nome LIKE "N%"; -- SELECIONA TODOS OS USUÁRIOS QUE CONTEREM O NOME QUE COMECE COM LETRA N
SELECT nome FROM cadastroUsuario WHERE nome LIKE "A%"; -- SELECIONA TODOS OS USUÁRIOS QUE CONTEREM O NOME QUE COMECE COM LETRA A

SELECT nome FROM cadastroUsuario WHERE nome LIKE "%E"; -- SELECIONA TODOS OS USUÁRIOS QUE CONTEREM O NOME QUE TERMINE COM LETRA E
SELECT nome FROM cadastroUsuario WHERE nome LIKE "%O"; -- SELECIONA TODOS OS USUÁRIOS QUE CONTEREM O NOME QUE TERMINE COM LETRA O
SELECT nome FROM cadastroUsuario WHERE nome LIKE "%A"; -- SELECIONA TODOS OS USUÁRIOS QUE CONTEREM O NOME QUE TERMINE COM LETRA A




