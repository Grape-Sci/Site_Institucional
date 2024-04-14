var contagemCalculo = 0
function calculo() {
    // ESPAÇO PARA ADIÇÃO DA FORMULA E VARIAVEIS
    var tipo = select_tipo.value;
    var invest = Number(input_invest.value);
    var tipoUva = select_tipoUva.value;
    var qtdVideira = 0;
    var preco = 0;
    var precoUsuario = Number(input_precoUsuario.value);


    let BrazilShilling = Intl.NumberFormat('pt-BR',{
        style:'currency',
        currency: 'BRL',
        maximumSignificantDigits: 3,
    });


    // VALIDAÇÃO DAS INPUTS
    if (valorInvestimento == 0 ||  precoKilo == 0) {
        alert('Numeros invalidos! Você precisa inserir numeros diferentes de zero!')
        console.warn('Insira novamente! Valores invalidos')
        //  else if(REGRA DE NEGOCIO PARA VALIDAR )
    } else{
        //calculo
        div_resultado.style = "display:flex"
        box_inputs.style = "display:none"

        
    if(tipo == 'DINHEIRO'){
        var investFormat = BrazilShilling.format(investFormat)
        var qtdVideira = invest/25 // 25 reais é o valor de 1 videira
        var qtdUvas = qtdVideiras * 15.7 // cada videira produz 15.7 kg de uva
        var lucro = precoUsuario * qtdUvas
        var perdaVideiras = qtdVideira * 0.21
        var perdaLucro = ((perdaVideiras * 15.7) * precoUsuario)

    }
    if(tipo == 'QUANTIDADE DE VIDEIRAS'){
        var preco = invest * 25 // 25 reais é o valor de 1 videira
        var qtdUvas = invest * 15.7 // invest = qtdVideiras, sendo que cada videira produz 15.7 kg de uva
        var lucro = precoUsuario * qtdUvas
        var perdaVideiras = invest * 0.21
        var perdaLucro = ((perdaVideiras * 15.7) * precoUsuario)
    }

    if(tipoUva = 'UVA THOMPSON'){
        
    }
    if(tipoUva = 'UVA ITÁLIA'){
        
    }
    if(tipoUva = 'UVA RUBI'){
        
    }
  

    }

    contagemCalculo++;
}
function retorno(){
    div_resultado.style = "display:none"
    box_inputs.style = "display:flex"

}