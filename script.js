// Criando Variáveis Locais
if (localStorage.getItem('tamanhoDoQuadro') === null) localStorage.setItem('tamanhoDoQuadro', '5');
const query = document.querySelector.bind(document);

// Adicionado Evento de Seleção de Cores

function removerCorDoAnterior() {
  const corSelecionada = document.querySelector('.selected');
  corSelecionada.classList.remove('selected');
}

function selecionarCor(event) {
  const corClicada = event.target;
  removerCorDoAnterior();
  corClicada.classList.add('selected');
}

// Criando a Paleta de Cores
const coresObrigatorias = 3;
const coresOpicionais = 12;

function corDoBackgroundAleatoria() {
  const x = Math.floor(Math.random() * 256);
  const y = Math.floor(Math.random() * 256);
  const z = Math.floor(Math.random() * 256);
  const bgColor = `rgb(${x},${y},${z})`;
  return bgColor;
}

const caixaDaPaleta = document.querySelector('#color-palette');

function criadoAPrimeiraCor() {
  const cor = document.createElement('div');
  cor.classList.add('color');
  cor.classList.add('selected');
  cor.style.backgroundColor = 'rgb(0,0,0)';
  cor.addEventListener('click', selecionarCor);
  caixaDaPaleta.appendChild(cor);
}

function criarPaletaDeCoresObrigatorias() {
  criadoAPrimeiraCor();
  for (let i = 0; i < coresObrigatorias; i += 1) {
    const cor = document.createElement('div');
    cor.style.backgroundColor = corDoBackgroundAleatoria();
    cor.classList.add('color');
    cor.addEventListener('click', selecionarCor);
    caixaDaPaleta.appendChild(cor);
  }
}

function criarPaletaDeCoresOpicionais() {
  for (let i = 0; i < coresOpicionais; i += 1) {
    const cor = document.createElement('div');
    cor.style.backgroundColor = corDoBackgroundAleatoria();
    cor.classList.add('anotherColor');
    cor.addEventListener('click', selecionarCor);
    caixaDaPaleta.appendChild(cor);
  }
}

criarPaletaDeCoresObrigatorias();
criarPaletaDeCoresOpicionais();

// Botão para Gerar mais Cores
document.querySelector('#generate-colors').addEventListener('click', () => {
  const cor = document.createElement('div');
  cor.style.backgroundColor = corDoBackgroundAleatoria();
  cor.classList.add('anotherColor');
  cor.addEventListener('click', selecionarCor);
  caixaDaPaleta.appendChild(cor);
});

// Pintando os Pixels com a Cor Selecionada

function pintarPixel(event) {
  const corSelecionada = document.querySelector('.selected');
  const cssObj = window.getComputedStyle(corSelecionada, null);
  const bgColor = cssObj.getPropertyValue('background-color');

  const pixelClicado = event.target;
  pixelClicado.style.backgroundColor = bgColor;
}

// Limpando os Pixels

function limparPixels() {
  const listaDePixels = document.querySelectorAll('.pixel');

  for (let i = 0; i < listaDePixels.length; i += 1) {
    listaDePixels[i].style.backgroundColor = 'rgba(255, 255, 255)';
  }
}

document.querySelector('#clear-board').addEventListener('click', limparPixels);

// Criado o Pixel Board

const pixelBoard = document.querySelector('#pixel-board');

function criarPixelBoard(tamanho) {
  for (let index = 0; index < tamanho; index += 1) {
    const linha = document.createElement('div');
    linha.classList.add('linha');
    pixelBoard.appendChild(linha);

    for (let i = 0; i < tamanho; i += 1) {
      const pixel = document.createElement('div');
      pixel.classList.add('pixel');
      pixel.addEventListener('click', pintarPixel);
      linha.appendChild(pixel);
    }
  }
}

criarPixelBoard(localStorage.getItem('tamanhoDoQuadro'));

// Removendo a Pixel Board

function removerPixelBoard() {
  const pixelsNoBoard = document.querySelectorAll('.linha');
  for (let i = 0; i < pixelsNoBoard.length; i += 1) {
    pixelBoard.removeChild(pixelsNoBoard[i]);
  }
}

// -- Criando o Board em Tamanho Personalizado

// Verificando se o Input de Tamanho não está Vazio e se não é maior que 50 ou menor que 5 e Pedindo a Criação do Board
const inputTamanhoDoQuadro = document.querySelector('#board-size');
const botaoTamanhoDoQuadro = document.querySelector('#generate-board');

// Verificando se o tamanho não é maior que 50 ou menor que 50
function verificarTamanhoDoQuadro() {
  if (inputTamanhoDoQuadro.value > 50) {
    inputTamanhoDoQuadro.value = 50;
    localStorage.setItem('tamanhoDoQuadro', 50);
  } if (inputTamanhoDoQuadro.value < 5) {
    inputTamanhoDoQuadro.value = 5;
    localStorage.setItem('tamanhoDoQuadro', 5);
  }
}

// ++ [CRÉDITOS] Utilizei a ajuda do Instrutor Tiago Quadros para me Ajudar a solucionar o Problema do por que o Avaliador não aceitava essa parte do código como válida.
botaoTamanhoDoQuadro.addEventListener('click', () => {
  if (inputTamanhoDoQuadro.value !== 0
    && inputTamanhoDoQuadro.value !== ''
    && inputTamanhoDoQuadro.value !== undefined) {
    verificarTamanhoDoQuadro();
    removerPixelBoard();
    localStorage.setItem('tamanhoDoQuadro', inputTamanhoDoQuadro.value);
    criarPixelBoard(inputTamanhoDoQuadro.value);
  } else {
    alert('Board inválido!');
  }
});
