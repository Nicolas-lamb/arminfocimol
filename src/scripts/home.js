const baseUrl = "https://arminfocimol.onrender.com";
let quantidadeA = 0;
let quantidadeB = 0;
let quantidadeC = 0;
let quantidadeD = 0;
let armarios;
let alunos;

function criarArmario(numeroArmario, nomeAluno, corStatus, alunoId) {
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

    cardArmario.addEventListener('click', function() {
        openModal(numeroArmario - 1, alunoId);
    });    

    return cardArmario;
}

async function listarArmarios() {
    try {
        const res = await fetch(`${baseUrl}/listarArmarios`, { method: "GET" });
        const data = await res.json();
        console.log(data)
        armarios = data
        renderizarArmariosC()
    } catch (error) {
        document.getElementById("resListarArmarios").textContent = `Erro: ${error.message}`;
    }
}

function renderizarArmariosC() {
    document.getElementById('titulo').innerText = 'Armários - Prédio C'
    const container = document.getElementById('containerArmarios');
    container.innerHTML = '';

    for (let i = 0; i < armarios.length; i++) {
        if (armarios[i][1] == "C") {
            let alunoId;
            let corStatus;
            if (armarios[i][3] == null || armarios[i][3] == false)
                corStatus = 'red';
            else
                corStatus = 'green';
            let nomeAluno;
            if (armarios[i][2] == null)
                nomeAluno = 'não está reservado'
            else{
                for(let f = 0; f<alunos.length; f++){
                    if(armarios[i][2] == alunos[f][0]){
                        nomeAluno = alunos[f][2]
                        alunoId = alunos[f][0]
                    }
                }
            }
            const itemArmario = criarArmario(i + 1, nomeAluno, corStatus, alunoId);
            container.appendChild(itemArmario);
        }
    }
}

function renderizarArmariosD() {
    document.getElementById('titulo').innerText = 'Armários - Prédio D'
    const container = document.getElementById('containerArmarios');
    container.innerHTML = '';

    for (let i = 0; i < armarios.length; i++) {
        if (armarios[i][1] == "D") {
            let alunoId;
            let corStatus;
            if (armarios[i][3] == null || armarios[i][3] == false)
                corStatus = 'red';
            else
                corStatus = 'green';
            let nomeAluno;
            if (armarios[i][2] == null)
                nomeAluno = 'não está reservado'
            else{
                for(let f = 0; f<alunos.length; f++){
                    if(armarios[i][2] == alunos[f][0]){
                        nomeAluno = alunos[f][2]
                        alunoId = alunos[f][0]
                    }
                }
            }
            const itemArmario = criarArmario(i + 1, nomeAluno, corStatus, alunoId);
            container.appendChild(itemArmario);
        }
    }
}

function renderizarArmariosA() {
    document.getElementById('titulo').innerText = 'Armários - Prédio A'
    const container = document.getElementById('containerArmarios');
    container.innerHTML = '';

    for (let i = 0; i < armarios.length; i++) {
        if (armarios[i][1] == "A") {
            let alunoId;
            let corStatus;
            if (armarios[i][3] == null || armarios[i][3] == false)
                corStatus = 'red';
            else
                corStatus = 'green';
            let nomeAluno;
            if (armarios[i][2] == null)
                nomeAluno = 'não está reservado'
            else{
                for(let f = 0; f<alunos.length; f++){
                    if(armarios[i][2] == alunos[f][0]){
                        nomeAluno = alunos[f][2]
                        alunoId = alunos[f][0]
                    }
                }
            }
            const itemArmario = criarArmario(i + 1, nomeAluno, corStatus, alunoId);
            container.appendChild(itemArmario);
        }
    }
}

function renderizarArmariosB() {
    document.getElementById('titulo').innerText = 'Armários - Prédio B'
    const container = document.getElementById('containerArmarios');
    container.innerHTML = '';


    for (let i = 0; i < armarios.length; i++) {
        if (armarios[i][1] == "B") {
            let alunoId;
            let corStatus;
            if (armarios[i][3] == null || armarios[i][3] == false)
                corStatus = 'red';
            else
                corStatus = 'green';
            let nomeAluno;
            if (armarios[i][2] == null)
                nomeAluno = 'não está reservado'
            else{
                for(let f = 0; f<alunos.length; f++){
                    if(armarios[i][2] == alunos[f][0]){
                        nomeAluno = alunos[f][2]
                        alunoId = alunos[f][0]
                    }
                }
            }
            const itemArmario = criarArmario(i + 1, nomeAluno, corStatus, alunoId);
            container.appendChild(itemArmario);
        }
    }
}

async function listarAlunos() {
    try {
      const res = await fetch(`${baseUrl}/listarAlunos`, { method: "GET" });
      const data = await res.json();
      console.log(data)
      alunos = data
    } catch (error) {
      document.getElementById("resListarAlunos").textContent = `Erro: ${error.message}`;
    }
  }

function openModal(id, alunoId) {
    document.getElementById('armarioNum').innerText = `Armário ${id+1}`
    document.getElementById("background").style.display = "flex";
    document.getElementsByTagName('body')[0].style.overflowY = "hidden";
    if(alunos[alunoId]){
        document.querySelector('.turma').innerText = alunos[alunoId][3]
    }else{
        document.querySelector('.turma').innerText = "Sem aluno"
    }

    document.querySelector('#predio').innerText = `Prédio ${armarios[id][1]}`

}

function closeModal() {
    document.getElementById("background").style.display = "none";
    document.getElementsByTagName("body")[0].style.overflowY = "auto";
}


document.getElementById("background").style.display = "none";

listarArmarios();
listarAlunos()

