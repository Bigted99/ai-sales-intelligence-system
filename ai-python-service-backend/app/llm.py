import requests

def local_model(prompt: str) -> str:
    response = requests.post(
        "http://localhost:11434/api/generate",
        json={
            "model": "mistral:7b-instruct-q4_0",
            "prompt": prompt,
            "stream": False
        }
    )

    if response.status_code != 200:
        raise Exception(f"Ollama error: {response.text}")

    return response.json()["response"]
