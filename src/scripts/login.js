document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    const loginData = {
        email: email,
        senha: senha
    };

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message); // Exibe mensagem de sucesso
            // Redireciona para a página home após login bem-sucedido
            window.location.href = '../home/index.html'; // Altere para a URL desejada
        } else {
            alert(data.message); // Exibe mensagem de erro
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        alert('Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde.');
    }
});