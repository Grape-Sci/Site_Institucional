function cadastrarPlantacao(areaVar) {
    console.log("areaVar", areaVar)
    fetch(`/dashHome/cadastrarPlantacao`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            areaServer: areaVar,
            idEmpresaServer: sessionStorage.ID_EMPRESA
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                console.log("Cadastro realizado")
            } else {
                throw "Houve um erro ao tentar realizar o cadastro!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });

    return false;
}

// function cadastrarPlantacao(idVar, areaVar) {
//     fetch(`/dashHome/cadastrarPlantacao`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             idServer: idVar,
//             areaServer: areaVar,
//             idEmpresaServer: sessionStorage.ID_EMPRESA
//         }),
//     })
//         .then(function (resposta) {
//             console.log("resposta: ", resposta);

//             if (resposta.ok) {
//                 console.log("Cadastro realizado")
//             } else {
//                 throw "Houve um erro ao tentar realizar o cadastro!";
//             }
//         })
//         .catch(function (resposta) {
//             console.log(`#ERRO: ${resposta}`);
//         });

//     return false;
// }

function cadastrarTalhao(selectIDVar, selectTipoVar, qtdVar, areaPlantVar, dataVar) {
    fetch(`/dashHome/cadastrarTalhao`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            IDselectServer: selectIDVar,
            tipoSelectServer: selectTipoVar,
            qtdServer: qtdVar,
            areaServer: areaPlantVar,
            dataServer: dataVar
            }),
            })
        
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                console.log("Cadastro realizado")
            } else {
                throw "Houve um erro ao tentar realizar o cadastro!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });

    return false;
}



    
    

