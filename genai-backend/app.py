from flask import Flask, request, jsonify
from story_generator import generate_story, get_prompt, generate_title
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

@app.route("/generate", methods=["POST"])
def generate():
    data = request.json

    prompt = data.get("prompt", "").strip()
    if not prompt:
        return jsonify({"error": "Prompt is required."}), 400

    max_length = int(data.get("max_length", 100))
    temperature = float(data.get("temperature", 1.0))

    title = generate_title()
    story = generate_story(prompt, max_length=max_length, temperature=temperature)

    return jsonify({
        "title": title,
        "prompt": prompt,
        "story": story
    })

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
