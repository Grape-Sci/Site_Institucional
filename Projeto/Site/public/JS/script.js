var contagemCalculo = 0
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
        if (tipo == 'DINHEIRO') {
            var investFormat = lShilling.format(invest);
            var qtdVideira = invest / 25; // 25 reais é o valor de 1 videira
            var qtdUvas = qtdVideira * 15.7; // cada videira produz 15.7 kg de uva
            var lucro = precoUsuario * qtdUvas;
            var lucroFormat = lShilling.format(lucro);
            var perdaVideiras = qtdVideira * 0.21;
            var perdaLucro = ((perdaVideiras * 15.7) * precoUsuario);
            var perdaLucroFormat = lShilling.format(perdaLucro);
        }
        if (tipo == 'QUANTIDADE DE VIDEIRAS') {

            var preco = invest * 25; // 25 reais é o valor de 1 videira
            var qtdUvas = invest * 15.7; // invest = qtdVideiras, sendo que cada videira produz 15.7 kg de uva
            var lucro = precoUsuario * qtdUvas;
            var lucroFormat = lShilling.format(lucro);
            var perdaVideiras = invest * 0.21
            var perdaLucro = (perdaVideiras * 15.7) * precoUsuario
            var perdaLucroFormat = lShilling.format(perdaLucro);
        }
        // VALIDAÇÕES PARA EXIBIÇÃO
        if (tipoUva == 'UVA THOMPSON') {
            if (tipo == 'QUANTIDADE DE VIDEIRAS') {
                div_resultado.style = "display:flex"
                box_inputs.style = "display:none"
                div_resultado.innerHTML = `<img id="logo" src="imagens1/logocompleta.png" class="logo">
                <p>Considerando o valor do investimento de : <u>${invest}</u> videiras</p>
                <p>Quantidade de uvas de <u>${qtdUvas}</u></p>
                <p>Você terá um lucro de: <span style="color: #54BD91;font-family: 'League-Spartan';font-weight: 700;">${lucroFormat}</span></p><br>
                <p>Caso você não usasse nosso sistema você perderia: <span span style="color: #ff0000;font-family: 'League-Spartan';font-weight: 700;">${perdaLucroFormat}</span></p><br>por safra!
                <button class="button" onclick="retorno()">Retornar</button>`
                console.log(`Calculo número ${contagemCalculo}º feito!`)
            } else {
                div_resultado.style = "display:flex"
                box_inputs.style = "display:none"
                div_resultado.innerHTML = `<img id="logo" src="imagens1/logocompleta.png" class="logo">
                <p>Considerando o valor do investimento de : <u>${investFormat}</u></p>
                <p>Quantidade de uvas de <u>${qtdUvas}</u></p>
                <p>Quantidade de videiras de <u>${qtdVideira}</u></p>
                <p>Você terá um lucro de: <span style="color: #54BD91;font-family: 'League-Spartan';font-weight: 700;">${lucroFormat}</span></p><br>
                <p>Caso você não usasse nosso sistema você perderia: <span span style="color: #ff0000;font-family: 'League-Spartan';font-weight: 700;">${perdaLucroFormat}</span></p><br>por safra!
                <button class="button" onclick="retorno()">Retornar</button>`
                console.log(`Calculo número ${contagemCalculo}º feito!`)
            }
        } else if (tipoUva == 'UVA ITÁLIA') {
            if (tipo == 'QUANTIDADE DE VIDEIRAS') {
                div_resultado.style = "display:flex"
                box_inputs.style = "display:none"
                div_resultado.innerHTML = `<img id="logo" src="imagens1/logocompleta.png" class="logo">
                <p>Considerando o valor do investimento de : <u>${invest}</u> videiras</p>
            <p>Quantidade de uvas de <u>${qtdUvas}</u></p>
            <p>Você terá um lucro de: <span style="color: #54BD91;font-family: 'League-Spartan';font-weight: 700;">${lucroFormat}</span></p><br>
            <p>Caso você não usasse nosso sistema você perderia: <span span style="color: #ff0000;font-family: 'League-Spartan';font-weight: 700;">${perdaLucroFormat}</span></p><br>por safra!
            <button class="button" onclick="retorno()">Retornar</button>`
                console.log(`Calculo número ${contagemCalculo}º feito!`)
            }
            else {
                div_resultado.style = "display:flex"
                box_inputs.style = "display:none"
                div_resultado.innerHTML = `<img id="logo" src="imagens1/logocompleta.png" class="logo">
                <p>Considerando o valor do investimento de : <u>${investFormat}</u></p>
                <p>Quantidade de uvas de <u>${qtdUvas}</u></p>
                <p>Quantidade de videiras de <u>${qtdVideira}</u></p>
                <p>Você terá um lucro de: <span style="color: #54BD91;font-family: 'League-Spartan';font-weight: 700;">${lucroFormat}</span></p><br>
                <p>Caso você não usasse nosso sistema você perderia: <span span style="color: #ff0000;font-family: 'League-Spartan';font-weight: 700;">${perdaLucroFormat}</span></p><br>por safra!
                <button class="button" onclick="retorno()">Retornar</button>`
                console.log(`Calculo número ${contagemCalculo}º feito!`)
            }
        } else if (tipoUva == 'UVA RUBI') {
            if (tipo == 'QUANTIDADE DE VIDEIRAS') {
                div_resultado.style = "display:flex"
                box_inputs.style = "display:none"
                div_resultado.innerHTML = `<img id="logo" src="imagens1/logocompleta.png" class="logo">
                <p>Considerando o valor do investimento de : <u>${invest}</u> videiras</p>
            <p>Quantidade de uvas de <u>${qtdUvas}</u></p>
            <p>Você terá um lucro de: <span style="color: #54BD91;font-family: 'League-Spartan';font-weight: 700;">${lucroFormat}</span></p><br>
            <p>Caso você não usasse nosso sistema você perderia: <span span style="color: #ff0000;font-family: 'League-Spartan';font-weight: 700;">${perdaLucroFormat}</span></p><br>por safra!
            <button class="button" onclick="retorno()">Retornar</button>`
                console.log(`Calculo número ${contagemCalculo}º feito!`)
            } else {
                div_resultado.style = "display:flex"
                box_inputs.style = "display:none"
                div_resultado.innerHTML = `<img id="logo" src="imagens1/logocompleta.png" class="logo">
                <p>Considerando o valor do investimento de : <u>${investFormat}</u></p>
                <p>Quantidade de uvas de <u>${qtdUvas}</u></p>
                <p>Quantidade de videiras de <u>${qtdVideira}</u></p>
                <p>Você terá um lucro de: <span style="color: #54BD91;font-family: 'League-Spartan';font-weight: 700;">${lucroFormat}</span></p><br>
                <p>Caso você não usasse nosso sistema você perderia: <span span style="color: #ff0000;font-family: 'League-Spartan';font-weight: 700;">${perdaLucroFormat}</span></p><br>por safra!
                <button class="button" onclick="retorno()">Retornar</button>`
                console.log(`Calculo número ${contagemCalculo}º feito!`)
            }
        }
    }
    contagemCalculo++;

}
function retorno() {
    div_resultado.style = "display:none"
    box_inputs.style = "display:flex"

}
