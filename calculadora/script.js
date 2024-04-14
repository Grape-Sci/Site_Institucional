
    var contagemCalculo = 0
function calculo() {
    // ESPAÇO PARA ADIÇÃO DA FORMULA E VARIAVEIS
    var valorInvestimento = Number(ipt_investimentoValor.value);
    var precoKilo = Number(ipt_precoKilo.value);


    // VALIDAÇÃO DAS INPUTS
    if (valorInvestimento == 0 ||  precoKilo == 0) {
        alert(`Numeros invalidos! Você precisa inserir numeros diferentes de zero!`)
        console.warn(`Insira novamente! Valores invalidos`)
        //  else if(REGRA DE NEGOCIO PARA VALIDAR )
    } else{

    }
    contagemCalculo++;
}