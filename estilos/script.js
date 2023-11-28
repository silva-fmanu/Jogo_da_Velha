const vez_quem = document.querySelector(".vez_quem");

let selected;
let player = "X";


const playerXWinsDisplay = document.getElementById('playerXWins'); //contador de vitórias
const playerOWinsDisplay = document.getElementById('playerOWins');

const restartButton = document.getElementById('restartButton');

let playerXWins = 0; //inicia sem nenhuma nada
let playerOWins = 0;
let empates = 0; 


let positions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7], /* Declara todas as posições que dão a vitória para o jogador, ou seja para ganhar o X precisa estar nessas posições*/ 
    [2, 5, 8], /*Quando essas posições são atingidas é vitório do jogador*/
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];
  
  function init() {
    selected = []; //nenhum botão selecionado
  
    vez_quem.innerHTML = `VEZ DO JOGADOR: ${player}`; //vezquem aramzena o player que é quem esta jogando que é o X ou O
  
    document.querySelectorAll(".area_jogo button").forEach((item) => { //seleciona todos os botões;
      item.innerHTML = ""; //inicia ele vazio antes da jogada
        item.classList.remove('x-style', 'o-style'); // Remove as classes de estilo ao reiniciar
      item.addEventListener("click", newMove); //quando clica ele inicia o novo movimento, novo evento
    });
  }

  init();

function newMove(e) { //função que recebe o evento novo movimento do botão
  const index = e.target.getAttribute("data-i"); //pega o atributo data-i que retorna o valor que foi atribuido, que no caso é a posição do botão
  e.target.innerHTML = player; //passa a informação do player, então se o player for X marca X se for O marca O
  
  if (player === 'X') {
    e.target.classList.add('x-style'); // Adiciona a classe para estilo do X
  } else {
    e.target.classList.add('o-style'); // Adiciona a classe para estilo do O
  }

  e.target.removeEventListener("click", newMove);//remove o evento do botão para não dar para clicar duas vezes
  selected[index] = player; //armazena o botão que foi selecionado e o jogador que apertou

  setTimeout(() => {
    check();
  }, [100]);

  player = player === "X" ? "O" : "X"; //troca o jogador, se for x traca para bolinha se for bolinha vai para x.
 

  vez_quem.innerHTML = `VEZ DO JOGADOR: ${player}`; //atribui o novo jogador a função
}


function check() {
    let playerLastMove = player === "X" ? "O" : "X"; //pega o ultimo jogador
  
    const items = selected
      .map((item, i) => [item, i]) //mapea quais foram os itens selecionados que gera um novo array com o item selecionado e o index dele ex=x >1
      .filter((item) => item[0] === playerLastMove) //filtra o array para ver quais foram os itens selecionados pelo jogador x por exemplo
      .map((item) => item[1]);
  
    for (pos of positions) { //for para verificar todas as posições posiveis que tem para ganhar que foi delcarado la em cima
      if (pos.every((item) => items.includes(item))) { //verifica se já tem um gannhador
       
        alert("O JOGADOR '" + playerLastMove + "' GANHOU!"); // Fala qual jogador ganhou (caso algun tenha ganhado) avisa qual ganhou 
        if (playerLastMove === 'X') {
          playerXWins++; // Incrementa a contagem de vitórias do jogador X
          playerXWinsDisplay.textContent = playerXWins; // Atualiza a exibição das vitórias do jogador X
        } else {
          playerOWins++; // Incrementa a contagem de vitórias do jogador O
          playerOWinsDisplay.textContent = playerOWins; // Atualiza a exibição das vitórias do jogador O
        }
        
        
        init(); //reinicia o jogo
        return;
      }
    }
  
    if (selected.filter((item) => item).length === 9) {
        alert("DEU VELHA!"); // Avisa que deu empate
        empates++; // Incrementa o contador de empates
        // Atualiza a exibição dos empates
        document.getElementById('empates').textContent = empates;
        init(); // Reinicia o jogo
        return;
    }

  }

  restartButton.addEventListener('click', function() {
    // Reinicia as variaveis de contagem
    playerXWins = 0;
    playerOWins = 0;
    empates = 0;

    // Atualiza a exibição do placar
    playerXWinsDisplay.textContent = playerXWins;
    playerOWinsDisplay.textContent = playerOWins;
    document.getElementById('empates').textContent = empates;

    // Reinicia o jogo
    init();
});