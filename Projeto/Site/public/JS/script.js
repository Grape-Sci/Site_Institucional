var contagemCalculo = 0
div_imagem.style.display = "block"

function calculo() {
    // ESPAÇO PARA ADIÇÃO DA FORMULA E VARIAVEIS
    var tipo = select_tipo.value;
    var invest = Number(input_invest.value);
    var tipoUva = select_tipoUva.value;
    var qtdVideira = 0;
    var preco = 0;
    var precoUsuario = Number(input_precoUsuario.value);


    let lShilling = Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        maximumSignificantDigits: 3,
    });
    var investFormat = lShilling.format(invest);

    // VALIDAÇÃO DAS INPUTS
    if (invest == 0 || precoUsuario == 0) {
        alert('Numeros invalidos! Você precisa inserir numeros diferentes de zero!')
        console.warn('Insira novamente! Valores invalidos')
        //  else if(REGRA DE NEGOCIO PARA VALIDAR )
    } else {
        //CALCULO
        if (tipo == 'Dinheiro') {
            var investFormat = lShilling.format(invest);
            var qtdVideira = invest / 25; // 25 reais é o valor de 1 videira
            var qtdUvas = qtdVideira * 15.7; // cada videira produz 15.7 kg de uva
            var lucro = precoUsuario * qtdUvas;
            var lucroFormat = lShilling.format(lucro);
            var perdaVideiras = qtdVideira * 0.21;
            var perdaLucro = ((perdaVideiras * 15.7) * precoUsuario);
            var perdaLucroFormat = lShilling.format(perdaLucro);

            var perdaMes = 0;
           
            for (cont = 1; cont <= 12; cont++) {
                perdaMes += (perdaLucro / 12);

                alert(`Mês ${cont}, sua perda sem o projeto será de R$ ${perdaMes.toFixed()}`)
            }
            
        }
        if (tipo == 'Quantidade de videiras') {

            var preco = invest * 25; // 25 reais é o valor de 1 videira
            var qtdUvas = invest * 15.7; // invest = qtdVideiras, sendo que cada videira produz 15.7 kg de uva
            var lucro = precoUsuario * qtdUvas;
            var lucroFormat = lShilling.format(lucro);
            var perdaVideiras = invest * 0.21
            var perdaLucro = (perdaVideiras * 15.7) * precoUsuario
            var perdaLucroFormat = lShilling.format(perdaLucro);
        }
        // VALIDAÇÕES PARA EXIBIÇÃO
        if (tipoUva == 'Uva Thompson') {
            if (tipo == 'Quantidade de videiras') {
                div_imagem.style.display = "none"
                div_tela.style.display = "block"
                div_tela.innerHTML =
                    `<p><img src="img/uvalogo.png" id="uvalogo" width="85" height="85"></p> 
                <p>Considerando o investimento de: <span>${invest} Videiras</span></p>
                <p>Quantidade de uvas: <span>${qtdUvas} Kg</span></p>
                <p>Você terá um lucro de: <span style="color: #54BD91">${lucroFormat}<span></p>
                <p>Caso você não usasse nosso sistema você perderia (por safra):<span style="color: #ff0000;">${perdaLucroFormat}</span></p>
                <p id="tipouva"><span style="color: #d049e4">Uvas Thompson</span> São apreciadas tanto como uva de mesa quanto para processamento em passas, sucos e geleias. As videiras são capazes de crescer em uma variedade de climas, a sua produtividade é elevada e são relativamente fáceis de cultivar.</p>
                <p><button class="button" onclick="retorno()">Retornar</button></p>
                `
                console.log(`Calculo número ${contagemCalculo}º feito!`)
            } else {
                div_imagem.style.display = "none"
                div_tela.style.display = "block"
                div_tela.innerHTML =
                    `<p><img src="img/uvalogo.png" id="uvalogo" width="85" height="85"></p> 
                <p>Considerando o valor do investimento de: <span>${investFormat}</span></p>
                <p>Quantidade de uvas: <span>${qtdUvas} Kg</span></p>
                <p>Você terá um lucro de: <span style="color: #54BD91">${lucroFormat}<span></p>
                <p>Caso você não usasse nosso sistema você perderia (por safra):<span style="color: #ff0000;">${perdaLucroFormat}</span></p>
                <p id="tipouva"><span style="color: #d049e4">Uvas Thompson</span> São apreciadas tanto como uva de mesa quanto para processamento em passas, sucos e geleias. As videiras são capazes de crescer em uma variedade de climas, a sua produtividade é elevada e são relativamente fáceis de cultivar.</p>
                <p><button class="button" onclick="retorno()">Retornar</button></p>
                `
            }
        } else if (tipoUva == 'Uva Itália') {
            if (tipo == 'Quantidade de videiras') {
                div_imagem.style.display = "none"
                div_tela.style.display = "block"
                div_tela.innerHTML =
                    `<p><img src="img/uvalogo.png" id="uvalogo" width="85" height="85"></p> 
                <p>Considerando o valor do investimento de: <span>${invest} Videiras</span></p>
                <p>Quantidade de uvas: <span>${qtdUvas} Kg</span></p>
                <p>Você terá um lucro de: <span style="color: #54BD91">${lucroFormat}<span></p>
                <p>Caso você não usasse nosso sistema você perderia (por safra):<span style="color: #ff0000;">${perdaLucroFormat}</span></p>
                <p id="tipouva"><span style="color: #d049e4">Uvas Itália</span> Popular para consumo direto e para a produção de vinhos brancos e espumantes, ou seja, proporciona flexibilidade para os produtores e para os destinos de sua colheita. A plantação é viável em uma variedade de climas, além do seu potencial ser de alta produtividade.</p>
                <p><button class="button" onclick="retorno()">Retornar</button></p>
                `
            }
            else {
                div_imagem.style.display = "none"
                div_tela.style.display = "block"
                div_tela.innerHTML =
                    `<p><img src="img/uvalogo.png" id="uvalogo" width="85" height="85"></p> 
                <p>Considerando o valor do investimento de: <span>${investFormat}</span></p>
                <p>Quantidade de uvas: <span>${qtdUvas} Kg</span></p>
                <p>Você terá um lucro de: <span style="color: #54BD91">${lucroFormat}<span></p>
                <p>Caso você não usasse nosso sistema você perderia (por safra):<span style="color: #ff0000;">${perdaLucroFormat}</span></p>
                <p id="tipouva"><span style="color: #d049e4">Uvas Itália</span> Popular para consumo direto e para a produção de vinhos brancos e espumantes, ou seja, proporciona flexibilidade para os produtores e para os destinos de sua colheita. A plantação é viável em uma variedade de climas, além do seu potencial ser de alta produtividade.</p>
                <p><button class="button" onclick="retorno()">Retornar</button></p>
                `
            }
        } else if (tipoUva == 'Uva Rubi') {
            if (tipo == 'Quantidade de videiras') {
                div_imagem.style.display = "none"
                div_tela.style.display = "block"
                div_tela.innerHTML =
                    `<p><img src="img/uvalogo.png" id="uvalogo" width="85" height="85"></p> 
                <p>Considerando o valor do investimento de: <span>${invest} Videiras</span></p>
                <p>Quantidade de uvas: <span>${qtdUvas} Kg</span></p>
                <p>Você terá um lucro de: <span style="color: #54BD91">${lucroFormat}<span></p>
                <p>Caso você não usasse nosso sistema você perderia (por safra):<span style="color: #ff0000;">${perdaLucroFormat}</span></p>
                <p id="tipouva"><span style="color: #d049e4">Uvas Rubi</span> É prospera para plantação em diversos climas, conhecida por seus potenciais benefícios à saúde. Sua tonalidade vermelha vibrante e tamanho generoso a tornam visualmente cativante para os consumidores, além da sua durabilidade pós-colheita.</p>
                <p><button class="button" onclick="retorno()">Retornar</button></p>
                `
            } else {
                div_imagem.style.display = "none"
                div_tela.style.display = "block"
                div_tela.innerHTML =
                    `<p><img src="img/uvalogo.png" id="uvalogo" width="85" height="85"></p> 
                <p>Considerando o valor do investimento de: <span>${investFormat} Videiras</span></p>
                <p>Quantidade de uvas: <span>${qtdUvas} Kg</span></p>
                <p>Você terá um lucro de: <span style="color: #54BD91">${lucroFormat}<span></p>
                <p>Caso você não usasse nosso sistema você perderia (por safra):<span style="color: #ff0000;">${perdaLucroFormat}</span></p>
                <p id="tipouva"><span style="color: #d049e4">Uvas Rubi</span> É prospera para plantação em diversos climas, conhecida por seus potenciais benefícios à saúde. Sua tonalidade vermelha vibrante e tamanho generoso a tornam visualmente cativante para os consumidores, além da sua durabilidade pós-colheita.</p>
                <p><button class="button" onclick="retorno()">Retornar</button></p>
                `
            }
        }
    }
    contagemCalculo++;

}
function retorno() {
    div_tela.style = "display:none"
    div_imagem.style = "display:block"

}

function login() {
    window.location = "login.html"
}