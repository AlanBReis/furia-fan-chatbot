from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Permitir que o React acesse a API

@app.route('/', methods=['GET'])
def home():
    return "FURIA Fan Chat Backend is running!"

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')
    
    # Aqui depois vamos conectar o Hugging Face ou outro modelo
    response = f"Você disse: {user_message}"  # Resposta simulada (mock)

    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
