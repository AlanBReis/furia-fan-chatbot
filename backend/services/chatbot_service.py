# backend/services/chatbot_service.py
import requests
from flask import jsonify
import os
from dotenv import load_dotenv
from dotenv import dotenv_values
config = dotenv_values(".env")
HUGGINGFACE_TOKEN = config.get("HF_API_TOKEN")

print("Token carregado:", HUGGINGFACE_TOKEN)

HUGGINGFACE_API_URL = "https://api-inference.huggingface.co/models/facebook/blenderbot-3B"



headers = {
    "Authorization": f"Bearer {HUGGINGFACE_TOKEN}"
}

def ask_chatbot(message):
    payload = {
        "inputs": {
            "text": message
        }
    }

    try:
        response = requests.post(HUGGINGFACE_API_URL, headers=headers, json=payload, timeout=60)
        response.raise_for_status()
        data = response.json()

        if isinstance(data, list) and "generated_text" in data[0]:
            return data[0]["generated_text"]
        elif "generated_text" in data:
            return data["generated_text"]

        return "Desculpe, não entendi a resposta do modelo."
    except requests.exceptions.Timeout:
        return "Tempo de resposta excedido. Tente novamente."
    except requests.exceptions.RequestException as e:
        return f"Erro ao se comunicar com o chatbot: {str(e)}"
