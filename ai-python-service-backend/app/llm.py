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

    print("OLLAMA STATUS:", response.status_code)
    print("OLLAMA RAW:", response.text)

    if response.status_code != 200:
        raise Exception(f"Ollama error: {response.text}")

    data = response.json()

    if "response" not in data:
        raise Exception(f"Unexpected Ollama response: {data}")

    return data["response"]
 