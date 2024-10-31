function closeModal() {
    document.getElementById("modal").style.display = "none";
    document.querySelector(".background").style.display = "flex";
    document.getElementById("botaoabrirmodal").style.display = "flex";
  }

  function openModal() {
    document.getElementById("modal").style.display = "flex";
    document.querySelector(".background").style.display = "none";
    document.getElementById("botaoabrirmodal").style.display = "none";
  }


  

  document.getElementById("modal").style.display = "none";
  document.querySelector(".background").style.display = "block";