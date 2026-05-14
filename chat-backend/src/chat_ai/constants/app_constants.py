import os
from dotenv import load_dotenv
load_dotenv()
# app.py
OLLAMA_BASE_URL = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")

# 2. Combine with the endpoint
OLLAMA_CHAT_URI = f"{OLLAMA_BASE_URL}/api/chat"
MODEL_NAME = "qwen3.5:9b-custom"