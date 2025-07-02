from flask import Flask, request, jsonify
from story_generator import generate_story, get_prompt, generate_title
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

def get_prompt(genre, custom_prompt):
    return custom_prompt or "Once upon a time in Mumbai..."

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
    app.run(debug=True)