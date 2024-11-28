const baseUrl = "https://arminfocimol.onrender.com";
let quantidadeA = 0;
let quantidadeB = 0;
let quantidadeC = 0;
let quantidadeD = 0;
let armarios;
let alunos;
let armarioId;

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
        openModal(numeroArmario, alunoId);
        armarioId = numeroArmario;
    });    

    return cardArmario;
}

async function listarArmarios() {
    try {
        const res = await fetch(`${baseUrl}/listarArmarios`, { method: "GET" });
        const data = await res.json();
        console.log(data)
        armarios = data
    } catch (error) {
        console.log(`Erro: ${error.message}`);
    }
}

function renderizarArmariosC() {
    document.getElementById('oi').style.display = 'flex'
    document.getElementById('titulo').innerText = 'Armários - Prédio C'
    const container = document.getElementById('containerArmarios');
    container.innerHTML = '';
    console.log(armarios.length)
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
                        alunoId = f
                    }
                }
            }
            const itemArmario = criarArmario(armarios[i][0], nomeAluno, corStatus, alunoId);
            container.appendChild(itemArmario);
        }
    }
}

function renderizarArmariosD() {
    document.getElementById('oi').style.display = 'flex'
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
                        alunoId = f
                    }
                }
            }
            const itemArmario = criarArmario(armarios[i][0], nomeAluno, corStatus, alunoId);
            container.appendChild(itemArmario);
        }
    }
}

function renderizarArmariosA() {
    document.getElementById('oi').style.display = 'flex'
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
                        alunoId = f
                    }
                }
            }
            const itemArmario = criarArmario(armarios[i][0], nomeAluno, corStatus, alunoId);
            container.appendChild(itemArmario);
        }
    }
}

function renderizarArmariosB() {
    document.getElementById('oi').style.display = 'flex'
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
                        alunoId = f
                    }
                }
            }
            const itemArmario = criarArmario(armarios[i][0], nomeAluno, corStatus, alunoId);
            container.appendChild(itemArmario);
        }
    }
}


function abrirBarra() {
    document.querySelector(".barra-lateral").style.display = "flex"
}

function fecharBarra() {
    document.querySelector(".barra-lateral").style.display = "none"
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
    document.getElementById("modal").style.display = "flex";
    console.log(alunoId)
    document.getElementById('armarioNum').innerText = `Armário ${id}`
    document.getElementById("background").style.display = "flex";
    document.getElementsByTagName('body')[0].style.overflowY = "hidden";
    if(alunos[alunoId] != undefined){
        if(alunos[alunoId][2] != null){
            document.querySelector('#nomeSelec').innerText = alunos[alunoId][2]
        }else{
            document.querySelector('#nomeSelec').innerText = "Sem aluno"
        }
    }else{
        document.querySelector('#nomeSelec').innerText = "Sem aluno"
    }


    console.log(armarios[id-1])
    document.getElementById('predio').innerText = `Prédio ${armarios[id-1][1]}`
}

function closeModal() {
    document.getElementById("background").style.display = "none";
    document.getElementsByTagName("body")[0].style.overflowY = "auto";
}

function openEditar() {
    document.getElementById("modal").style.display = "none";
    document.getElementById("modal2").style.display = "flex";
    document.getElementById("armarioName").innerText = `Armário ${armarioId}`;

}

function closeEditar() {
    document.getElementById("background").style.display = "none";
    document.getElementById("modal2").style.display = "none";
    document.getElementsByTagName("body")[0].style.overflowY = "auto";
    listarArmarios()
}

async function editarArmario(event) {
    const numero_armario = armarioId;
    const reservado = true;
    const nome_aluno = document.getElementById("Nome").value;
    const email = document.getElementById("Email").value;
    const turma = document.getElementById("Turma").value;
    console.log('oi')

    try {
      const res = await fetch(`${baseUrl}/editarArmario`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ numero_armario, reservado, nome_aluno, email, turma }),
      });
      const data = await res.json();
      console.log(data);
      closeEditar()
      carregarPagina();
    } catch (error) {
     console.log(`Erro: ${error.message}`);
    }
  }

  async function cadastrarArmario(event) {
    event.preventDefault();
    
    const predio = document.querySelector('.inputAddPredio').value.toUpperCase();

   if(predio == "A" || predio == "B" || predio == "C" || predio == "D"){


        try {
        const res = await fetch(`${baseUrl}/cadastroArmario`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ predio }),
        });
        const data = await res.json();
        carregarPagina();
        } catch (error) {
         alert(error)
        }
    }else{
        alert('Predio inváido')
    }       
  }

  async function liberarArmario(){
            
    try {
        const response = await fetch(`${baseUrl}/liberar_armario/${armarioId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        closeModal()
        carregarPagina();

        
    } catch (error) {
        alert(`Erro na solicitação: ${error.message}`)
        
    }

}

async function enviarEmail() {
    try {
      const res = await fetch(`${baseUrl}/enviar_email`, { method: "GET" });
      const data = await res.json();
      alert(JSON.stringify(data));
    } catch (error) {
      alert(error)
    }
  }

  async function uploadPDF(event) {
    event.preventDefault();
    const file = document.getElementById("fileUpload").files[0];
    const formData = new FormData();
    formData.append("fileUpload", file);

    try {
      const res = await fetch(`${baseUrl}/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      document.getElementById("resUploadPDF").textContent = JSON.stringify(data);
    } catch (error) {
      document.getElementById("resUploadPDF").textContent = "Erro: ${error.message}";
    }
  }


document.getElementById("background").style.display = "none";

listarArmarios();
listarAlunos()

async function  carregarPagina () {
    await listarAlunos();
    await listarArmarios();
    renderizarArmariosC()
}

