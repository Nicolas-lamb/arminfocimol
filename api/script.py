from flask import Flask, render_template_string, redirect, url_for, request
from flask_mail import Mail, Message
import mysql.connector

app = Flask(__name__)

# Configurações para o Flask-Mail
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
    'host': 'localhost',         
    'user': 'prog2sexta',       
    'password': '123456',     
    'database': 'prog2sexta'      
}

@app.route("/enviar_email")
def enviar_email():
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()
        
        cursor.execute("SELECT contato_id, e_mail FROM tb_contato")
        emails = cursor.fetchall() 
        
        html_body_template = '''
        <h3>Oi, você quer confirmar?</h3>
       <a href="{{ url_for('confirmar_email', id=contato_id, _external=True) }}">
            <button style="padding:10px; background-color:green; color:white; border:none; cursor:pointer;">Sim</button>
        </a>
        <a href="https://google.com"> 
            <button style="padding:10px; background-color:red; color:white; border:none; cursor:pointer;">Não</button>
        </a>
        '''
        #substituir a url do google por uma de agradecimento

        for contato_id, destinatario in emails:
            html_body = render_template_string(html_body_template, contato_id=contato_id)
            msg = Message("Confirmação", recipients=[destinatario])
            msg.html = html_body
            mail.send(msg)
        
        cursor.close()
        conn.close()

        return "E-mails enviados com sucesso!"
    except Exception as e:
        return f"Erro ao enviar e-mail: {str(e)}"

# Rota para capturar a confirmação e atualizar o banco de dados
@app.route("/confirmar_email/<int:id>")
def confirmar_email(id):
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()
        

        cursor.execute("UPDATE tb_contato SET renovado = 'true' WHERE contato_id = %s", (id,))
        conn.commit()
        
        cursor.close()
        conn.close()

        # Redireciona para um site externo
        return redirect("https://google.com")  # Altere para a de agradecimento quando concluida
    except Exception as e:
        return f"Erro ao atualizar confirmação: {str(e)}"

if __name__ == '__main__':
    app.run(debug=True)
