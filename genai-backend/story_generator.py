import requests
import os

API_URL = "https://api-inference.huggingface.co/models/gpt2"
HF_TOKEN = os.getenv("HF_TOKEN")

headers = {
    "Authorization": f"Bearer {HF_TOKEN}"
}

def generate_story(prompt, max_length=100, temperature=1.0):
    payload = {
        "inputs": prompt,
        "parameters": {
            "max_length": max_length,
            "temperature": temperature,
            "do_sample": True
        }
    }
    response = requests.post(API_URL, headers=headers, json=payload)

    try:
        result = response.json()
        return result[0]["generated_text"]
    except Exception as e:
        print("HF API ERROR:", response.text)
        return "Error generating story."

def generate_title():
    return "Generated Story"
