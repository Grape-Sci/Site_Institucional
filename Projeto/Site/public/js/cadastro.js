var temErro = false;
var codigoFunc;
var codigoGer;
var email;
var emailEmpresa;

var usuarioVar;
var telefoneVar;
var senhaVar;
var empresaVar;
var emailVar;
var cpfVar;
var cargoVar;
var idEmpresaVar;



function listar() {
    fetch("/usuarios/listarEmpresas", {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then((empresas) => {
                empresas.forEach((empresa) => {
                    select_empresa.innerHTML += `<option value='${empresa.idEmpresa}'>${empresa.nome}</option>`;
                });

                
            });
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function mascararCpf(Event) {
    var cpflength = input_cpf.value.length;
    var ultimoChar = input_cpf.value.charAt(cpflength - 1);    // Verifica se o último caractere adicionado foi ponto ou traço
    if (Event.key == "Backspace") {

    } else {
        if ((ultimoChar !== '.' && ultimoChar !== '-') && cpflength !== 14) {
            if (cpflength === 3 || cpflength === 7) {
                input_cpf.value += '.';
            } else if (cpflength === 11) {
                input_cpf.value += '-';
            }
        }
    }
}

function mascararTel(Event) {
    var telefonelength = input_telefone.value.length;
    var ultimoChar = input_telefone.value.charAt(telefonelength - 1);    // Verifica se o último caractere adicionado foi ponto ou traço
    if (Event.key == "Backspace") {


    } else {
        if ((ultimoChar !== '(' && ultimoChar !== ')' && ultimoChar !== '-' && ultimoChar !== ' ') && telefonelength !== 15) {
            if (telefonelength === 0) {
                input_telefone.value += '(';
            } else if (telefonelength === 3) {
                input_telefone.value += ') ';
            } else if (telefonelength === 10) {
                input_telefone.value += '-';
            }
        }
    }
}

function removerMascara(valorComMascara) {
    var valorSemMascara = valorComMascara.replaceAll("-", "");

    valorSemMascara = valorSemMascara.replaceAll(".", "");

    valorSemMascara = valorSemMascara.replaceAll(" ", "");

    valorSemMascara = valorSemMascara.replaceAll("(", "")
    valorSemMascara = valorSemMascara.replaceAll(")", "")

    return valorSemMascara
}

function destacarCamposIncorretos() {
    // Remove a borda vermelha de todos os campos
    var campos = document.querySelectorAll('input, select');
    campos.forEach(function (campo) {
        campo.style.border = '';
    });

    // Adiciona a borda vermelha aos campos preenchidos incorretamente
    if (usuarioVar == "") {
        input_usuario.style.border = '1px solid red';
    }
    if (cpfVar == "") {
        input_cpf.style.border = '1px solid red';
    }
    if (telefoneVar == "") {
        input_telefone.style.border = '1px solid red';
    }
    if (senhaVar == "") {
        input_senha.style.border = '1px solid red';
    }
    if (confirmar == "") {
        input_confirmarSenha.style.border = '1px solid red';
    }
    if (empresaVar == "0") {
        select_empresa.style.border = '1px solid red';
    }
    if (emailVar == "" || emailVar.indexOf('@') < 0 || emailVar.indexOf('.') < 0) {
        input_email.style.border = '1px solid red';
    }
    if (cargoVar == "0") {
        select_cargo.style.border = '1px solid red';
    }
}


async function cadastrar() {
    telefoneVar = removerMascara(input_telefone.value);
    cpfVar = removerMascara(input_cpf.value);
    usuarioVar = input_usuario.value;
    senhaVar = input_senha.value;
    empresaVar = select_empresa.value;
    emailVar = input_email.value;
    cargoVar = select_cargo.value;
    var confirmar = input_confirmarSenha.value;
    idEmpresaVar = empresaVar;
    temErro = false;


    if (usuarioVar == "" || cpfVar == 0 || telefoneVar == "" || senhaVar == "" || empresaVar == 0 || emailVar == "" || cargoVar == 0 || confirmar == "") {
        buildCardMensagem("block", 'erro', 'Preencha os campos corretamente', true);
        destacarCamposIncorretos(); // Chama a função para destacar os campos incorretos
    } else if (emailVar.indexOf('@') < 0 && emailVar.indexOf('.') < 0) {
        buildCardMensagem("block", 'erro', "Insira um e-mail válido", true);
        destacarCamposIncorretos(); // Chama a função para destacar os campos incorretos
    } else if (senhaVar.length < 6) {
        buildCardMensagem("block", 'erro', "A senha deve conter ao mínimo 5 caracteres", true);
        destacarCamposIncorretos(); // Chama a função para destacar os campos incorretos
    } else if (senhaVar != confirmar) {
        buildCardMensagem("block", 'erro', "Suas senhas estão diferentes", true);
        destacarCamposIncorretos(); // Chama a função para destacar os campos incorretos
    }

    if (temErro == false) {
        await buscarCodigoEmpresa(idEmpresaVar);
        div_cadastro.style = 'display:none';
        div_confirmacao.style = 'display:block';
        emailEnviado.innerHTML = email;
    }
}



function enviar() {
    var codigo = input_codigo.value;


    if (cargoVar == 1) {
        if (codigoGer == codigo) {
            cadastrarDados(idEmpresaVar)
            buildCardMensagem("block", 'ok', "Redirecionando para o Login", false)
            setTimeout(function () {
                window.location = "login.html"
            }, 1000)
        }
        else {
            buildCardMensagem("block", 'erro', "Código de confirmação inválido", true)
        }
    } else {
        if (codigoFunc == codigo) {
            cadastrarDados(idEmpresaVar)
            buildCardMensagem("block", 'ok', "Redirecionando para o Login", false)
            setTimeout(function () {
                window.location = "login.html"
            }, 1000)
        }
        else {
            buildCardMensagem("block", 'erro', "Código de confirmação inválido", true)
        }
    }
}

async function buscarCodigoEmpresa(idEmpresa) {
    await fetch(`/usuarios/buscarCodigoEmpresa/${idEmpresa}`, {
        method: "GET",
    })
        .then(async function (resposta) {
            await resposta.json().then(async (codigos) => {
                codigoFunc = codigos[0].codAutenticF
                codigoGer = codigos[0].codAutenticG
                email = codigos[0].email

            });
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function inicio() {
    window.location = 'index.html';
}

function inicioConf() {
    window.location = 'index.html';
}

function buildCardMensagem(display, classe, mensagem, isErro) {
    const msg = document.getElementById('mensagem');

    msg_alertas.style.display = display;
    msg.classList.add(classe)
    msg.innerHTML = mensagem;
    temErro = isErro;
    setTimeout(function () {
        msg_alertas.style.display = "none"
    }, 3000)
}

function cadastrarDados(idEmpresa) {
    fetch(`/usuarios/cadastrarDados/:${idEmpresa}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            usuarioServer: usuarioVar,
            telefoneServer: telefoneVar,
            senhaServer: senhaVar,
            emailServer: emailVar,
            cargoServer: cargoVar,
            cpfServer: cpfVar,
            idEmpresaServer: idEmpresaVar
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