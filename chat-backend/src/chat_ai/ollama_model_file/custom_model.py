import subprocess
import os

def create_ollama_model():
    model_name = "qwen3.5:9b-custom"
    # Find your actual user name and replace 'vdhar' if different
    ollama_path = r"C:\Users\vdhar\AppData\Local\Programs\Ollama\ollama.exe"
    modelfile_path = "Modelfile"

    if not os.path.exists(ollama_path):
        # Fallback check if the above path is wrong
        print("Checking system PATH instead...")
        ollama_path = "ollama"

    try:
        # Pass the full path to the executable here
        result = subprocess.run(
            [ollama_path, "create", model_name, "-f", modelfile_path],
            capture_output=True,
            text=True,
            check=True
        )
        print("Model created successfully!")
    except Exception as e:
        print(f"Error: {e}")

create_ollama_model()