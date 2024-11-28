const baseUrl = "https://arminfocimol.onrender.com";
document.querySelector("form").addEventListener("submit", login);
async function login(event) {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;

        try {
        const res = await fetch(`${baseUrl}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, senha }),
        });
        const data = await res.json();
        console.log(data)
        window.location.href = '../home/home.html';
        // document.getElementById("resLogin").textContent = JSON.stringify(data);
    } catch (error) {
        document.getElementById("resLogin").textContent = `Erro: ${error.message}`;
    }
}