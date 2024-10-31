const button = document.querySelector("#armdiv"); // 
let modal = document.querySelector("dialog");// visualizar modal com infos
const closeModal = document.querySelector("dialog button");//fechar janela modal com os detalhes do armario.

button.onclick = function () {
    modal.showModal()
}

closeModal.onclick = function () {
    modal.close()
}