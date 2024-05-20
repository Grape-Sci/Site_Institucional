var temErro = false;
var codigoFunc;
var codigoGer;

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

function cadastrar() {
    // Captura os valores dos campos do formulário
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

    if (usuarioVar == "" || cpfVar == 0 || telefoneVar == "" || senhaVar == "" || empresaVar == 0 || emailVar == "" || cargoVar == 0 ||
        confirmar == "") {
        buildCardMensagem("block", 'erro', 'Preencha os campos corretamente', true)
    } else if (emailVar.indexOf('@') < 0 && emailVar.indexOf('.') < 0) {
        buildCardMensagem("block", 'erro', "Insira um e-mail válido", true)
    } else if (senhaVar.length < 6) {
        buildCardMensagem("block", 'erro', "A senha deve conter ao mínimo 5 caracteres", true)
    } else if (senhaVar != confirmar) {
        buildCardMensagem("block", 'erro', "Suas senhas estão diferentes", true)
    }

    // Se não houver erros, oculta o formulário de cadastro e exibe uma mensagem de confirmação

    if (temErro == false) {
        div_cadastro.style = 'display:none';
        div_confirmacao.style = 'display:block';
        buscarCodigoEmpresa(idEmpresaVar);
    }

}


function enviar() {
    var codigo = input_codigo.value

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

function buscarCodigoEmpresa(idEmpresa) {
    fetch(`/usuarios/buscarCodigoEmpresa/${idEmpresa}`, {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then((codigos) => {
                codigoFunc = codigos[0].codAutenticF
                codigoGer = codigos[0].codAutenticG
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