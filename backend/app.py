from flask import Flask, request, jsonify
from services.chatbot_service import ask_chatbot
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()  # Carrega variáveis do .env

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def home():
    return "FURIA Fan Chat Backend is running!"

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')
    response = ask_chatbot(user_message)
    if "Erro ao se comunicar com o chatbot:" in response or "Tempo de resposta excedido." in response or "Desculpe, não entendi a resposta do modelo." in response:
        return jsonify({'error': response}), 500  # Retorne um código de erro 500
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
