const btnCalcular = document.getElementById('btn-calcular');
const inputPeso = document.getElementById('peso');
const inputAltura = document.getElementById('altura');
const divResultado = document.getElementById('resultado');
const pValorImc = document.getElementById('valor-imc');
const pClassificacao = document.getElementById('classificacao');

btnCalcular.addEventListener('click', function() {
    const peso = parseFloat(inputPeso.value);
    const altura = parseFloat(inputAltura.value);

    // Validação básica
    if (!peso || !altura || peso <= 0 || altura <= 0) {
        alert('Por favor, preencha o peso e a altura com valores válidos.');
        return;
    }

    // Cálculo do IMC: Peso / (Altura * Altura)
    const imc = peso / (altura * altura);
    let classificacao = '';

    // Classificação conforme diretrizes
    if (imc < 18.5) {
        classificacao = 'Abaixo do peso';
    } else if (imc >= 18.5 && imc < 25) {
        classificacao = 'Peso normal (Eutrofia)';
    } else if (imc >= 25 && imc < 30) {
        classificacao = 'Sobrepeso';
    } else if (imc >= 30 && imc < 35) {
        classificacao = 'Obesidade Grau I';
    } else if (imc >= 35 && imc < 40) {
        classificacao = 'Obesidade Grau II';
    } else {
        classificacao = 'Obesidade Grau III (Mórbida)';
    }

    // Exibindo o resultado na tela
    pValorImc.textContent = `Seu IMC é: ${imc.toFixed(2)}`;
    pClassificacao.textContent = `Classificação: ${classificacao}`;
    divResultado.classList.remove('hidden');
});