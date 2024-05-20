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
SELECT D.idDispositivo,D.nomeSensor, R.consultaUmi, R.consultaTemp, R.registroDt, U.umiMIN,U.umiMax, U.tempMIN,U.tempMax
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