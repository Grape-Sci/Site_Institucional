
    var contagemCalculo = 0
function calculo() {
    // ESPAÇO PARA ADIÇÃO DA FORMULA E VARIAVEIS
    var valorInvestimento = Number(ipt_investimentoValor.value);
    var precoKilo = Number(ipt_precoKilo.value);
    var videirasPorHectar = Number(ipt_videirasPorHectar.value);
    var qtdKilosPorVideira = Number(ipt_qtdKilosPorVideira.value)

    // VALIDAÇÃO DAS INPUTS
    if (valorInvestimento == 0 ||  precoKilo == 0) {
        alert(`Numeros invalidos! Você precisa inserir numeros diferentes de zero!`)
        console.warn(`Insira novamente! Valores invalidos`)
        //  else if(REGRA DE NEGOCIO PARA VALIDAR )
    } else{
        div_resultado.style = "display:flex"
        box_inputs.style = "display:none"
    }
    contagemCalculo++;
}
function retorno(){
    div_resultado.style = "display:none"
    box_inputs.style = "display:flex"
}