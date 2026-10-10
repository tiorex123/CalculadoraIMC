// Relógio em tempo real da Dark Hour
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const clockEl = document.querySelector('.clock');
    if (clockEl) {
        clockEl.textContent = `${hours}:${minutes}:${seconds}`;
    }
}
setInterval(updateClock, 1000);
updateClock();

// Seleção de Gênero (Botões estilizados)
const generoButtons = document.querySelectorAll('#genero-group .radio-btn');
generoButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        generoButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

// Botões de Presets da S.E.E.S. (Makoto, Akihiko, Yukari)
const presetButtons = document.querySelectorAll('.preset-btn');
presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const peso = btn.getAttribute('data-peso');
        const altura = btn.getAttribute('data-altura');
        const genero = btn.getAttribute('data-genero');

        document.getElementById('peso').value = peso;
        document.getElementById('altura').value = altura;

        generoButtons.forEach(b => {
            if (b.getAttribute('data-value') === genero) {
                b.classList.add('active');
            } else {
                b.classList.remove('active');
            }
        });

        calcularIMC();
    });
});

// Função principal de cálculo do IMC
function calcularIMC() {
    const pesoInput = parseFloat(document.getElementById('peso').value);
    const alturaInput = parseFloat(document.getElementById('altura').value);

    if (!pesoInput || !alturaInput || pesoInput <= 0 || alturaInput <= 0) {
        alert('ERRO DE CALIBRAGEM: Insira valores válidos de peso e estatura para iniciar a análise.');
        return;
    }

    // Cálculo IMC = Peso / (Altura * Altura)
    const imc = pesoInput / (alturaInput * alturaInput);
    
    // Cálculo da faixa ideal aproximada baseada no IMC normal (18.5 a 24.9)
    const pesoMinIdeal = (18.5 * (alturaInput * alturaInput)).toFixed(1);
    const pesoMaxIdeal = (24.9 * (alturaInput * alturaInput)).toFixed(1);

    let classificacao = '';
    let statusBgColor = '#0055ff'; // Cor padrão container
    let activeSegmentIndex = 1;

    if (imc < 18.5) {
        classificacao = 'ABAIXO DO PESO (BAIXO)';
        activeSegmentIndex = 0;
    } else if (imc >= 18.5 && imc < 25) {
        classificacao = 'OPTIMAL STATUS (PESO NORMAL)';
        activeSegmentIndex = 1;
    } else if (imc >= 25 && imc < 30) {
        classificacao = 'SOBREPESO TÁTICO';
        activeSegmentIndex = 2;
    } else {
        classificacao = 'OBESIDADE // ATENÇÃO DE OPERAÇÃO';
        activeSegmentIndex = 3;
    }

    // Atualizando elementos visuais na UI
    document.getElementById('score-imc').innerHTML = `${imc.toFixed(2)} <small>kg/m²</small>`;
    document.getElementById('classificacao-txt').textContent = classificacao;
    document.getElementById('faixa-ideal').textContent = `Faixa ideal sugerida: ${pesoMinIdeal} kg – ${pesoMaxIdeal} kg`;
    document.getElementById('ideal-tag-mini').textContent = `${imc.toFixed(2)} // FISICO IDEAL`;

    // Atualização estimada da meta de água baseada no peso
    const aguaMl = (pesoInput * 35).toFixed(0);
    const aguaL = (aguaMl / 1000).toFixed(2);
    document.getElementById('advice-agua').textContent = `Meta diária: ${aguaL}L de água para resistir ao estresse da Dark Hour.`;

    // Atualizando segmentos da barra tática de HP/SP
    const segments = document.querySelectorAll('.segmented-bar .bar-segment');
    segments.forEach((seg, index) => {
        if (index === activeSegmentIndex) {
            seg.classList.add('active-seg');
        } else {
            seg.classList.remove('active-seg');
        }
    });
}

// Evento no botão de execução de análise
document.getElementById('btn-execute').addEventListener('click', calcularIMC);

// Calcular ao carregar a página com os valores padrão iniciais
window.addEventListener('DOMContentLoaded', () => {
    calcularIMC();
});