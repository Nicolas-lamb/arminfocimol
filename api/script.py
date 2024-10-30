from flask import Flask, render_template_string, redirect, url_for, request
from flask_mail import Mail, Message
import mysql.connector

app = Flask(__name__)

# Configurações para o Flask-Mail (usando o Gmail como exemplo)
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = 'arminfocimol@gmail.com'
app.config['MAIL_PASSWORD'] = 'dkdg iuyq xrtq ieoi'
app.config['MAIL_DEFAULT_SENDER'] = 'arminfocimol@gmail.com'

mail = Mail(app)

# Configurações do banco de dados MySQL
db_config = {
    'host': 'localhost',         # altere para o host do seu banco de dados
    'user': 'prog2sexta',       # altere para o usuário do seu banco de dados
    'password': '123456',     # altere para a senha do seu banco de dados
    'database': 'prog2sexta'      # altere para o nome do seu banco de dados
}

@app.route("/enviar_email")
def enviar_email():
    try:
        # Conexão ao banco de dados MySQL
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()
        
        # Consulta para buscar todos os emails na tabela 'email'
        cursor.execute("SELECT e_mail FROM tb_contato")
        emails = [row[0] for row in cursor.fetchall()]  # Lista de emails
        
        # Corpo do e-mail com um botão "Sim" que redireciona para a rota "/resposta"
        html_body = '''
        <h3>Oi, você quer confirmar?</h3>
        <a href="https://google.com">
            <button style="padding:10px; background-color:green; color:white; border:none; cursor:pointer;">Sim</button>
        </a>
        <a href="deadshot.io"> 
            <button style="padding:10px; background-color:red; color:white; border:none; cursor:pointer;">Não</button>
        </a>
        '''
        
        # Envia o e-mail para cada destinatário
        for destinatario in emails:
            msg = Message("Confirmação", recipients=[destinatario])
            msg.html = render_template_string(html_body)
            mail.send(msg)
        
        # Fecha a conexão com o banco de dados
        cursor.close()
        conn.close()

        return "E-mails enviados com sucesso!"
    except Exception as e:
        return f"Erro ao enviar e-mail: {str(e)}"

if __name__ == '__main__':
    app.run(debug=True)
