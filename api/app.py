from flask import Flask, jsonify, render_template_string, redirect, url_for, request
from flask_cors import CORS
from flask_mail import Mail, Message
import psycopg2  # Substitui o mysql.connector
from psycopg2 import sql, Error  # Importa o módulo de erro de psycopg2
import pdfplumber

app = Flask(__name__)
CORS(app)  # Permite CORS para todas as rotas por padrão

# Configurações para o Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = 'arminfocimol@gmail.com'
app.config['MAIL_PASSWORD'] = 'dkdg iuyq xrtq ieoi'
app.config['MAIL_DEFAULT_SENDER'] = 'arminfocimol@gmail.com'

mail = Mail(app)

# Configurações do banco de dados PostgreSQL
db_config = {
    'host': 'separately-worthy-boarfish.data-1.use1.tembo.io',
    'user': 'postgres',
    'password': 'GxDdnPUY8xnUKzO0',
    'database': 'postgres'
}

def get_db_connection():
    try:
        conn = psycopg2.connect(**db_config)
        return conn
    except Error as e:
        print(f"Erro na conexão: {e}")
        return None

# Rotas

@app.route("/enviar_email")
def enviar_email():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT id_aluno, email FROM alunos WHERE renovado = NULL OR renovado= 'false'")
        emails = cursor.fetchall()

        html_body_template = '''
        <h3>Oi, você quer confirmar?</h3>
        <a href="{{ url_for('confirmar_email', id=id_aluno, _external=True) }}">
            <button style="padding:10px; background-color:green; color:white; border:none; cursor:pointer;">Sim</button>
        </a>
        <a href="{{ url_for('rejeitar_email', id=id_aluno, _external=True) }}">
            <button style="padding:10px; background-color:red; color:white; border:none; cursor:pointer;">Não</button>
        </a>
        '''

        for id_aluno, destinatario in emails:
            html_body = render_template_string(html_body_template, id_aluno=id_aluno)
            msg = Message("Confirmação", recipients=[destinatario])
            msg.html = html_body
            mail.send(msg)
        
        cursor.close()
        conn.close()

        return jsonify({'message': 'E-mails enviados com sucesso!'}), 200
    except Exception as e:
        return jsonify({'error': f'Erro ao enviar e-mail: {str(e)}'}), 500

@app.route("/confirmar_email/<int:id>")
def confirmar_email(id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("UPDATE alunos SET renovado = true WHERE id_aluno = %s", (id,))
        conn.commit()
        cursor.close()
        conn.close()
        return redirect("https://google.com")
    except Exception as e:
        return f"Erro ao atualizar confirmação: {str(e)}"
    
@app.route("/rejeitar_email/<int:id>")
def rejeitar_email(id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("UPDATE alunos SET renovado = false WHERE id_aluno = %s", (id,))
        conn.commit()
        cursor.close()
        conn.close()
        return redirect("https://google.com")
    except Exception as e:
        return f"Erro ao atualizar confirmação: {str(e)}"

@app.route("/login", methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    senha = data.get('senha')

    if not email or not senha:
        return jsonify({'error': 'Email e senha são necessários'}), 400

    conn = get_db_connection()
    if not conn:
        return jsonify({'error': 'Erro de conexão com o banco de dados'}), 500

    try:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM usuarios WHERE email = %s AND senha = %s", (email, senha))
        user = cursor.fetchone()
        return jsonify({'message': 'Login bem-sucedido', 'email': email}) if user else jsonify({'error': 'Credenciais inválidas'}), 401
    finally:
        cursor.close()
        conn.close()

@app.route("/cadastroAluno", methods=['POST'])
def cadastroAluno():
    data = request.json
    nome = data.get('nome')
    email = data.get('email')
    turma = data.get('turma')

    conn = get_db_connection()
    if not conn:
        return jsonify({'error': 'Erro de conexão com o banco de dados'}), 500

    try:
        cursor = conn.cursor()
        cursor.execute("INSERT INTO alunos (nome, email, turma) VALUES (%s, %s, %s)", (nome, email, turma))
        conn.commit()
        return jsonify({'mensagem': 'Aluno cadastrado com sucesso.'}), 201
    finally:
        cursor.close()
        conn.close()

@app.route("/cadastroArmario", methods=['POST'])
def cadastroArmario():
    data = request.json
    predio = data.get('predio')

    conn = get_db_connection()
    if not conn:
        return jsonify({'error': 'Erro de conexão com o banco de dados'}), 500

    try:
        cursor = conn.cursor()
        cursor.execute("INSERT INTO armarios (predio) VALUES (%s)", (predio,))
        conn.commit()
        return jsonify({'mensagem': 'Armário cadastrado com sucesso.'}), 201
    finally:
        cursor.close()
        conn.close()

@app.route("/editarArmario", methods=['POST'])
def editarArmario():
    data = request.json
    numero_armario = data.get("numero_armario")
    reservado = data.get("reservado")
    nome = data.get("nome_aluno")
    email = data.get("email")
    turma = data.get("turma")

    conn = get_db_connection()
    if not conn:
        return jsonify({'error': 'Erro de conexão com o banco de dados'}), 500

    try: 
        cursor = conn.cursor()
        if not reservado:
            cursor.execute("UPDATE armarios SET id_aluno = NULL, reservado = FALSE WHERE numero_armario = %s", (numero_armario,))
        else:
            cursor.execute("SELECT id_aluno FROM alunos WHERE email = %s", (email,))
            aluno = cursor.fetchone()
            aluno_id = aluno[0] if aluno else None

            if not aluno_id:
                cursor.execute("INSERT INTO alunos (nome, email, turma) VALUES (%s, %s, %s)", (nome, email, turma))
                conn.commit()
                cursor.execute("SELECT id_aluno FROM alunos WHERE email = %s", (email,))
                aluno_id = cursor.fetchone()[0]

            cursor.execute("UPDATE armarios SET id_aluno = %s, reservado = TRUE WHERE numero_armario = %s", (aluno_id, numero_armario))
        conn.commit()
        return jsonify({'mensagem': 'Armário editado com sucesso.'}), 201
    finally:
        cursor.close()
        conn.close()

@app.route("/listarArmarios", methods=['GET'])
def listarArmarios():
    conn = get_db_connection()
    if not conn:
        return jsonify({'error': 'Erro de conexão com o banco de dados'}), 500

    try:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM armarios")
        armarios = cursor.fetchall()
        return jsonify(armarios), 200
    finally:
        cursor.close()
        conn.close()

@app.route("/listarAlunos", methods=['GET'])
def listarAlunos():
    conn = get_db_connection()
    if not conn:
        return jsonify({'error': 'Erro de conexão com o banco de dados'}), 500

    try:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM alunos")
        alunos = cursor.fetchall()
        return jsonify(alunos), 200
    finally:
        cursor.close()
        conn.close()

@app.route('/upload', methods=['POST'])
def upload_pdf():
    if 'fileUpload' not in request.files:
        return "Nenhum arquivo enviado.", 400

    file = request.files['fileUpload']
    if not file.filename:
        return "Arquivo inválido.", 400

    file_path = f"./{file.filename}"
    file.save(file_path)
    extracted_data = extract_pdf_data(file_path)
    return jsonify(extracted_data)

def extract_pdf_data(file_path):
    data = []
    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            text = page.extract_text()
            if text:
                for line in text.splitlines()[1:]:
                    columns = line.split()
                    if len(columns) >= 3:
                        nome, email, turma = " ".join(columns[:-2]), columns[-2], columns[-1]
                        data.append({"Nome": nome, "Email": email, "Turma": turma})

                        conn = get_db_connection()
                        cursor = conn.cursor()
                        cursor.execute("INSERT INTO alunos (nome, email, turma) VALUES (%s, %s, %s)", (nome, email, turma))
                        conn.commit()
                        cursor.close()
                        conn.close()
    return data

if __name__ == '__main__':
    app.run(debug=True, port=8080)

