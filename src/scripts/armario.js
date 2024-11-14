const ARM_API = 'http://arminfocimol.onrender.com/';

function criarArmario(numeroArmario, nomeAluno, corStatus) {
    const cardArmario = document.createElement('div');
    cardArmario.classList.add('card-armario');
  
    const indicadorStatus = document.createElement('div');
    indicadorStatus.classList.add('indicador-status');
    indicadorStatus.style.backgroundColor = corStatus;
    cardArmario.appendChild(indicadorStatus);
  
    const idArmario = document.createElement('div');
    idArmario.classList.add('id-armario');
    idArmario.innerText = `ARM ${numeroArmario}`;
    cardArmario.appendChild(idArmario);
  
    const nomeAlunoElem = document.createElement('div');
    nomeAlunoElem.classList.add('nome-aluno');
    nomeAlunoElem.innerHTML = `<span style="font-size: 10px;">Aluno</span><br>${nomeAluno}`;
    cardArmario.appendChild(nomeAlunoElem);
  
    return cardArmario;
  }
  
  function renderizarArmarios(quantidade) {
    const container = document.getElementById('containerArmarios');
    container.innerHTML = '';
  
    for (let i = 1; i <= quantidade; i++) {
      const corStatus = i % 3 === 0 ? 'red' : i % 3 === 1 ? 'green' : 'yellow';
      const itemArmario = criarArmario(i, 'Fulano Belt', corStatus);
      container.appendChild(itemArmario);
    }
  }
  
  renderizarArmarios(18);
  